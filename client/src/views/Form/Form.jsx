import { getAllGenres, postVideoGame } from "../../redux/actions/actions";
import style from "./Form.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Form = () => {
  const dispatch = useDispatch();

  const allGenres = useSelector((state) => state.allGenres);

  useEffect(() => {
    // va a tomar el funcionamiento de un componentdidmount
    dispatch(getAllGenres());
  }, []);

  const [state, setState] = useState({
    name: "",
    image: "",
    description: "",
    released: "",
    rating: "",
    platforms: "",
    genres: [],
  });

  const [errors, setErrors] = useState({
    // siempre su valor va a ser un string, y siempre va a almacenar errores.
    name: "*Este campo es requerido",
    image: "",
    description: "*Este campo es requerido",
    released: "*Este campo es requerido",
    rating: "*Este campo es requerido",
    platforms: "*Este campo es requerido",
    genres: "*El videojuego debe tener al menos 1 genero",
  });

  const formValidate = (state, name) => {
    const regexCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\\/\-]/; // Para validar que el campo no contenga caracteres especiales.
    const regexSpace = /^[^\s].*$/; // valida que no haya un espacio al principio del string
    switch (name) {
      case "name":
        if (state.name === "")
          setErrors({ ...errors, name: "*Este campo es requerido" });
        else if (regexCharacter.test(state.name))
          setErrors({
            ...errors,
            name: "*El nombre debe contener solo letras o números",
          });
          else if(!regexSpace.test(state.name))
          setErrors({
            ...errors,
            name: "*El nombre debe comenzar con un carácter",
          });
        else if (state.name.length > 20)
          setErrors({
            ...errors,
            name: "*Debe contener menos de 20 caracteres",
          });
        else setErrors({ ...errors, name: "" });
        break;

      case "description":
        if (state.description === "")
          setErrors({ ...errors, description: "*Este campo es requerido" });
        else if(!regexSpace.test(state.description))
        setErrors({
          ...errors,
          description: "*La descripcion debe comenzar con un carácter ",
        });

        else if (state.description.length < 10)
        setErrors({
      ...errors,
      description: "*Debe contener mas de 10 caracteres",
    });
        else setErrors({ ...errors, description: "" });
        break;

      case "released":
        if (state.released === "")
          setErrors({ ...errors, released: "*Este campo es requerido" });
        else setErrors({ ...errors, released: "" });
        break;

      case "rating":
        if (state.rating === "")
          setErrors({ ...errors, rating: "*Este campo es requerido" });
        else if(!regexSpace.test(state.rating))
        setErrors({
          ...errors,
          rating: "*El rating debe comenzar con un carácter",
        });
        else if (isNaN(parseInt(state.rating)))
          setErrors({
            ...errors,
            rating: "*El carácter ingresado no es un numero",
          });
        else if (state.rating >= 0 && state.rating <= 5)
          setErrors({ ...errors, rating: "" });
        else if (state.rating > 5)
          setErrors({
            ...errors,
            rating: "*El valor del rating tiene que ser entre 0 y 5",
          });
        else setErrors({ ...errors, rating: "" });
        break;
      case "platforms":
        if (state.platforms === "")
          setErrors({ ...errors, platforms: "*Este campo es requerido" });
        else if(regexCharacter.test(state.platforms))setErrors({...errors, platforms:"*La plataforma debe contener solo letras o números"})
        else if(!regexSpace.test(state.platforms))
        setErrors({
          ...errors,
          platforms: "*El nombre debe comenzar con un carácter",
        });
        else setErrors({ ...errors, platforms: "" });
        break;
        case "genres":
      if (state.genres.length === 0) {
        setErrors({ ...errors, genres: "*Al menos un género es requerido" });
      } else {
        setErrors({ ...errors, genres: "" });
      }
      break;
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "genres") {
      setState((prevState) => ({
        ...prevState,
        [name]: [...prevState[name], value],
      }));
      document.getElementById(name).value = "";
    } else {
      setState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }

    //re-rendering
    formValidate(
      {
        ...state,
        [event.target.name]: event.target.value,
      },
      event.target.name
    );
  };

  const handleAddGenre = () => {
    const genreValue = document.getElementById("genres").value;
    if (genreValue) {
      setState((prevState) => ({
        ...prevState,
        genres: [...prevState.genres, genreValue],
      }));
      
      // Limpiar mensaje de error al agregar un género
      setErrors({ ...errors, genres: "" });
      
      // Limpiar el campo de selección de géneros
      document.getElementById("genres").value = "";
    }
  };

  const disabledSubmit = () => {
    let disabled = true;
    for (let error in errors) {
      if (errors[error] === "") disabled = false;
      else {
        disabled = true;
        break;
      }
    }
    return disabled;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postVideoGame(state));
  };

  return (
    <div className={style.ContainerForm}>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input name="name" onChange={handleChange} type="text" />
        {errors.name}
        <label>Image:</label>
        <input name="image" onChange={handleChange} type="text" />
        <label>Description:</label>
        <input name="description" onChange={handleChange} type="text" />
        {errors.description}
        <label>Released:</label>
        <input name="released" onChange={handleChange} type="date" />
        {errors.released}
        <label>Rating:</label>
        <input name="rating" onChange={handleChange} type="text" />
        {errors.rating}

        <label>Platforms:</label>
        <input name="platforms" onChange={handleChange} type="text"></input>
        {errors.platforms}

        <label>Genres:</label>
        <select name="genres" id="genres">
          <option selected="selected" disabled="disabled">
            Select genres
          </option>
          {allGenres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
        <button name="genres" type="button" onClick={handleAddGenre}>
          Add genres
        </button>
        {errors.genres} 




        <input disabled={disabledSubmit()} type="submit" />
      </form>
    </div>
  );
};

export default Form;
