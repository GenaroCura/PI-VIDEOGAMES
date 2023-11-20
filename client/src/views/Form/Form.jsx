import {getAllGames, getAllGenres, postVideoGame } from "../../redux/actions/actions";
import style from "./Form.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Form = () => {
  const dispatch = useDispatch();
  const allGenres = useSelector((state) => state.allGenres);
  const allPlatforms = useSelector((state) => state.allPlatforms)

  useEffect(() => {
    // va a tomar el funcionamiento de un componentdidmount
    dispatch(getAllGenres());
    dispatch(getAllGames ());
  }, []);


  const [state, setState] = useState({
    name: "",
    image: "",  
    description: "",
    released: "",
    rating: "",
    platforms: [],
    genres: [],
  });


  const [errors, setErrors] = useState({
    // siempre su valor va a ser un string, y siempre va a almacenar errores.
    name: "*Este campo es requerido",
    image: "",
    description: "*Este campo es requerido",
    released: "*Este campo es requerido",
    rating: "*Este campo es requerido",
    platforms: "",
    genres: "*El videojuego debe contener al menos 1 genero",
  });

  //Validaciones
  const formValidate = (state, name) => {
    const regexCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\\/\-]/; // Para validar que el campo no contenga caracteres especiales.
    const regexSpace = /^[^\s].*$/; // valida que no haya un espacio al principio del string
    // const regexUrl = /^https:\/\/.*\.(jpg|png)$/; // valida que la imagen sea una url y empiece con https y termine en jpg o png
    switch (name) {
      case "name":
        if (state.name === "")
          setErrors({ ...errors, name: "*Este campo es requerido" });
        else if (regexCharacter.test(state.name))
          setErrors({
            ...errors,
            name: "*El nombre no puedo contener caracteres especiales",
          });
        else if (!regexSpace.test(state.name))
          setErrors({
            ...errors,
            name: "*El nombre debe comenzar con un carácter",
          });
        else if (state.name.length > 30)
          setErrors({
            ...errors,
            name: "*Debe contener menos de 30 caracteres",
          });
        else setErrors({ ...errors, name: "" });
        break;

      

      case "description":
        if (state.description === "")
          setErrors({ ...errors, description: "*Este campo es requerido" });
        else if (!regexSpace.test(state.description))
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
        else if (state.rating < 0)
          setErrors({
            ...errors,
            rating: "*El rating debe ser entre 0 y 5",
          });
        else if (state.rating <= 5) setErrors({ ...errors, rating: "" });
        else if (state.rating > 5)
          setErrors({
            ...errors,
            rating: "*El valor del rating tiene que ser entre 0 y 5",
          });
        else setErrors({ ...errors, rating: "" });
        break;
          

      default:
        break;
    }
  };
  const handleChange = (event) => {
    if (event.target.name === "platforms") {
      const selectPlatform = event.target.value
      // Si el campo de plataformas no está vacío
      if (selectPlatform) {
        setState({
          ...state,
          platforms: [...state.platforms, selectPlatform],
        });
        // Limpiar el campo de plataformas después de agregar
        event.target.value = "";
      }
    } else if (event.target.name === "genres") {
      const genreId = parseInt(event.target.value);
      if (!state.genres.includes(genreId)) {
        setState({
          ...state,
          genres: [...state.genres, genreId],
        });
        // Limpiar el campo de géneros después de agregar
        event.target.value = "";
        setErrors({
          ...errors,
          genres: "", // Limpiar el error al agregar un género
        });
      }
    } else {
      setState({
        ...state,
        [event.target.name]: event.target.value,
      });
    }

    formValidate(
      {
        ...state,
        [event.target.name]: event.target.value,
      },
      event.target.name,
      setErrors
    );
  };

  
  

  const remove = (type, index) => {
    if (type === 'genre') {
      const updatedGenres = [...state.genres];
      updatedGenres.splice(index, 1);
      setState({
        ...state,
        genres: updatedGenres,
      });} }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postVideoGame(state));
  };

  const disabledSubmit = () => {
    let disabledAux = true;
    for (let error in errors) {
      if (errors[error] === "") disabledAux = false;
      else {
        disabledAux = true;
        break;
      }
    }
    return disabledAux;
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
        <input name="rating" onChange={handleChange} type="number" />
        {errors.rating}

        <label>Platforms:</label>
        <select name="platforms" onChange={handleChange}>
          <option  selected = "selected"  disabled="disabled">Select platforms</option>
          {allPlatforms.map((platform) => (
            <option key={platform}>{platform}</option>
          ))}
        </select>
        <div>
          {state.platforms.map((platform)=> <span key={platform}>{platform}</span>)}
        </div>
        {errors.platforms}

        <label>Genres:</label>
        <select name="genres" onChange={handleChange}>
          <option selected="selected" disabled="disabled">Select genres</option>
          {allGenres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
        <div>
          {state.genres.map((genreId, index) => (
            <span key={genreId}>
               {allGenres.find((genre) => genre.id === genreId)?.name || "No tiene nombre"}
               <button type="button" onClick={() => remove('genre', index)}>
       X
      </button>
            </span>
            
          ))}
        </div>
        {errors.genres}

        <input disabled={disabledSubmit()}  type="submit" />
      </form>
    </div>
  );
};

export default Form;
