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
    platforms: [],
    genres: [],
  });

  const [errors, setErrors] = useState({
    // siempre su valor va a ser un string, y siempre va a almacenar errores.
    name: "*Este campo es requerido",
    image: "Si no colocas una imagen, se te colocara una por default",
    description: "*Este campo es requerido",
    released: "*Este campo es requerido",
    rating: "*Este campo es requerido",
    platforms: "*Este campo es requerido",
    genres: "*El videojuego debe tener al menos 1 genero",
  });

  

  //Validaciones
  const formValidate = (state, name) => {
    const regexCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\\/\-]/; // Para validar que el campo no contenga caracteres especiales.
    const regexSpace = /^[^\s].*$/; // valida que no haya un espacio al principio del string
    const regexUrl = /^https:\/\/.*\.(jpg|png)$/; // valida que la imagen sea una url y empiece con https y termine en jpg o png
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
        else if (state.name.length > 30)
          setErrors({
            ...errors,
            name: "*Debe contener menos de 30 caracteres",
          });
        else setErrors({ ...errors, name: "" });
        break;

        case "image":
        if (state.image === "") {
          setErrors({
            ...errors,
            image: "*Si no colocas una imagen, se te colocará una por defecto",
          });
        } else if (!regexUrl.test(state.image)) {
          setErrors({
            ...errors,
            image: "La URL de la imagen no es válida (debe comenzar con https y terminar en jpg o png)",
          });
        } else {
          setErrors({ ...errors, image: "" });
        }
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
      if (state.genres.length === 0) 
        setErrors({ ...errors, genres: "*Al menos un género es requerido" });
      else {
        setErrors({ ...errors, genres: "" });
      }
      break;
    }
};

 

  const handleChange = (event) => {
    console.log(event)
    if(event.target.name === "platforms"){
      
      setState({
        ...state,
        platforms: [...state.platforms, document.getElementById("platforms").value]
      })
      document.getElementById("platforms").value = "";
    }else if (event.target.name === "genres" ){
      setState({
        ...state,
        genres: [...state.genres, event.target.value]
      })
    }

    else{ 
    setState({
      ...state,
      [event.target.name]: event.target.value
    }) }


    //re-rendering
    formValidate(
      {
        ...state,
        [event.target.name]: event.target.value,
      },
      event.target.name
    );
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postVideoGame(state));
  };

  return (
    <div className={style.ContainerForm}>
      <form onSubmit={handleSubmit}>
       {console.log(state)}
        <label>Name:</label>
        <input name="name" onChange={handleChange} type="text" />
        {errors.name}
        <label>Image:</label>
        <input name="image" onChange={handleChange} type="text" />
        {errors.image}
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
        <input name="platforms" type="text" id="platforms"></input>
        <button type="button" name="platforms" onClick={handleChange}>Add platforms</button>
        {errors.platforms}

        <label>Genres:</label>
        <select onChange={handleChange} name="genres">
          <option selected="selected" disabled="disabled">
            Select genres
          </option>
          {allGenres.map((genre) => (
            <option key={genre.id} value={genre.name}>
              {genre.name}
            </option>
          ))}
        </select>
        <input type="submit" />
      </form>
    </div>
  );
};

export default Form;
