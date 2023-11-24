import {
  getAllGames,
  getAllGenres,
  postVideoGame,
} from "../../redux/actions/actions";
import style from "./Form.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Form = () => {
  const dispatch = useDispatch();
  const allGenres = useSelector((state) => state.allGenres);
  const allPlatforms = useSelector((state) => state.allPlatforms);

  useEffect(() => {
    dispatch(getAllGenres());
    dispatch(getAllGames());
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
    platforms: "*El videojuego debe contener al menos 1 plataforma",
    genres: "*El videojuego debe contener al menos 1 genero",
  });

  //Validaciones
  const formValidate = (state, name) => {
    const regexCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\\/\-]/; // Para validar que el campo no contenga caracteres especiales.
    const regexSpace = /^[^\s].*$/; // valida que no haya un espacio al principio del string
    const regexUrl = /^https:\/\/.*\.(jpg|png)/; // valida que la imagen sea una url y empiece con https e incluya jpg o png.
    const regexRating = /^\d+(\.\d{1,2})?$/; // Para validar que el rating, tenga hasta dos  decimales
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
            name: "*El nombre no puede empezar con un espacio",
          });
        else if (state.name.length > 30)
          setErrors({
            ...errors,
            name: "*Debe contener menos de 30 caracteres",
          });
        else setErrors({ ...errors, name: "" });
        break;



      case "image":
        if(state.image.length === 0)setErrors({...errors, image: ""})
        else if(!regexSpace.test(state.image))setErrors({...errors, image:"*La url de la imagen no puede comenzar con un espacio"})
        else if (!regexUrl.test(state.image))
          setErrors({
            ...errors,
            image: "*Por favor, ingrese una URL válida para la imagen",
          });
        else setErrors({...errors, image:""}) 
        break;




      case "description":
        if (state.description === "")
          setErrors({ ...errors, description: "*Este campo es requerido" });
        else if (!regexSpace.test(state.description))
          setErrors({
            ...errors,
            description: "*La descripcion no puede comenzar con un espacio",
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
        if (state.rating === "") {
          setErrors({ ...errors, rating: "*Este campo es requerido" });
        } else if (state.rating < 0 || state.rating > 5) {
          setErrors({
            ...errors,
            rating: "*El valor del rating debe estar entre 0 y 5",
          });
        } else if (!regexRating.test(state.rating)) {
          setErrors({
            ...errors,
            rating: "*El rating puede tener hasta dos decimales",
          });
        } else {
          setErrors({ ...errors, rating: "" });
        }
        break;

      case "platforms":
        if (state.platforms.length === 0) {
          setErrors({
            ...errors,
            platforms: "*El videojuego debe contener al menos 1 plataforma",
          });
        } else {
          setErrors({
            ...errors,
            platforms: "",
          });
        }
        break;

      case "genres":
        if (state.genres.length === 0) {
          setErrors({
            ...errors,
            genres: "*El videojuego debe contener al menos 1 género",
          });
        } else {
          setErrors({
            ...errors,
            genres: "",
          });
        }
        break;

      default:
        break;
    }
  };

  const handleChange = (event) => {
    if (event.target.name === "platforms") {
      const selectPlatform = event.target.value;
      if (!state.platforms.includes(selectPlatform)) {
        setState({
          ...state,
          platforms: [...state.platforms, selectPlatform],
        });
      }
    } else if (event.target.name === "genres") {
      const genreId = parseInt(event.target.value);
      if (!state.genres.includes(genreId)) {
        setState({
          ...state,
          genres: [...state.genres, genreId],
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
    if (type === "genre") {
      const Genres = [...state.genres];
      Genres.splice(index, 1);

      setState({
        ...state,
        genres: Genres,
      });

      // Verifico si aún hay géneros después de eliminar uno
      if (Genres.length === 0) {
        setErrors({
          ...errors,
          genres: "*El videojuego debe contener al menos 1 género",
        });
      } else {
        setErrors({
          ...errors,
          genres: "",
        });
      }
    } else if (type === "platform") {
      const Platforms = [...state.platforms];
      Platforms.splice(index, 1);

      setState({
        ...state,
        platforms: Platforms,
      });

      if (Platforms.length === 0) {
        setErrors({
          ...errors,
          platforms: "*El videojuego debe contener al menos 1 plataforma",
        });
      } else {
        setErrors({
          ...errors,
          platforms: "",
        });
      }
    }
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


  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postVideoGame(state));
  };

  return (
    <div className={style.ContainerForm}>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input name="name" onChange={handleChange} type="text" />
        <div className={style.ErrorsColor}>{errors.name}</div>
        <label>Image:</label>
        <input name="image" onChange={handleChange} type="text"  placeholder="Imagen por default si no brindas una"/>
        <div className={style.ErrorsColor}>{errors.image}</div>
        <label>Description:</label>
        <input name="description" onChange={handleChange} type="text" />
        <div className={style.ErrorsColor}>{errors.description}</div>
        <label>Released:</label>
        <input name="released" onChange={handleChange} type="date" />
        <div className={style.ErrorsColor}>{errors.released}</div>
        <label>Rating:</label>
        <input
          name="rating"
          onChange={handleChange}
          type="number"
          step="0.01"
        />
        <div className={style.ErrorsColor}>{errors.rating}</div>

        <label>Platforms:</label>
        <select name="platforms" onChange={handleChange}>
          <option disabled="disabled" selected="selected">
            Select platforms
          </option>
          {allPlatforms.map((platform) => (
            <option key={platform}>{platform}</option>
          ))}
        </select>
        <div>
          {state.platforms.map((platform, index) => (
            <span key={platform}>
              {platform}
              <button type="button" onClick={() => remove("platform", index)}>
                X
              </button>
            </span>
          ))}
        </div>
        <div className={style.ErrorsColor}>{errors.platforms}</div>

        <label>Genres:</label>
        <select name="genres" onChange={handleChange}>
          <option selected="selected" disabled="disabled">
            Select genres
          </option>
          {allGenres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
        <div>
          {state.genres.map((genreId, index) => (
            <span key={genreId}>
              {allGenres.find((genre) => genre.id === genreId)?.name}
              <button type="button" onClick={() => remove("genre", index)}>
                X
              </button>
            </span>
          ))}
        </div>
        <div className={style.ErrorsColor}>{errors.genres}</div>

        <input disabled={disabledSubmit()} type="submit" value="Create Game"></input>
      </form>
    </div>
  );
};

export default Form;
