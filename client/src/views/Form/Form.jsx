import { getAllGenres, postVideoGame } from "../../redux/actions/actions";
import style from "./Form.module.css";
import { useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

const Form = () => {

    const dispatch = useDispatch();

    const allGenres = useSelector(state => state.allGenres)


    useEffect(()=>{ // va a tomar el funcionamiento de un componentdidmount
        dispatch(getAllGenres())
    },[])


    
    

    const [state, setState] = useState({
        name:"",
        image:"",
        description:"",
        released:"",
        rating:"",
        platforms:[],
        genres:[],
    });


    const [errors, setErrors] = useState({ // siempre su valor va a ser un string, y siempre va a almacenar errores.
        name:"*Este campo es requerido",
        image:"",
        description:"*Este campo es requerido",
        released:"*Este campo es requerido",
        rating:"*Este campo es requerido",
        platforms:"",
        genres:"",
    });

    

    const formValidate = (state,name) => {
        const regexCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\\/\-]/; // Para validar que el nombre no contenga caracteres especiales.
        switch(name){
            case "name":
                if(state.name === "") setErrors({...errors, name:"*Este campo es requerido"})
                else if(regexCharacter.test(state.name))setErrors({...errors, name:"*El nombre debe contener solo letras o números"})
                else if(state.name.length > 20)setErrors({...errors, name:"*Debe contener menos de 20 caracteres"})
                else setErrors({...errors, name:""})
            break;

            case "description":
                if(state.description === "")setErrors({...errors, description:"*Este campo es requerido"})
                else if(state.description.length < 10)setErrors({...errors, description:"*Debe contener mas de 10 caracteres"})
                else setErrors({...errors, description:""})
            break;

            case "released":
                if(state.released === "")setErrors({...errors, released:"*Este campo es requerido"})
                else if(!/^\d{4}-\d{2}-\d{2}$/.test(state.released))setErrors({ ...errors, released: "*El Formato de fecha debe ser (YYYY-MM-DD)" })
                else setErrors({ ...errors, released: "" });
            break;

            case "rating":
                if(state.rating === "") setErrors({...errors, rating:"*Este campo es requerido"})
                else if(isNaN(parseInt(state.rating))) setErrors({...errors, rating:"*El carácter ingresado no es un numero"})
                else if (state.rating >=0 && state.rating <=5)setErrors({...errors, rating:""})
                else if(state.rating > 5)setErrors({...errors, rating: "*El valor del rating tiene que ser entre 0 y 5"})
                else setErrors({...errors, rating:""})
                break;
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
      
        if (name === "genres" || name === "platforms") {
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
    // const handleChange = (event) => { //modificador del estado.
    //     if(event.target.name==="genres"){
    //         const value = document.getElementById("genres").value
    //         setState({
    //             ...state,
    //             [event.target.name]: [...state.genres,value]
    //         })
    //         document.getElementById("genres").value = "";
    //     }else if(event.target.name==="platforms"){
    //         const value = document.getElementById("platforms").value
    //         console.log(value)
    //         setState({
    //             ...state,
    //             [event.target.name]: [...state.platforms,value]
    //         })
    //         document.getElementById("platforms").value = "";
    //     }else{
    //         setState({
    //             ...state,
    //             [event.target.name]: event.target.value
    //         })
    //     }


        //re-rendering
        formValidate({
            ...state,
            [event.target.name]: event.target.value
        }, event.target.name);
    }
    
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

const handleSubmit = (event) =>{
    event.preventDefault();
    dispatch(postVideoGame(state))
};
    
    return (
        <div className={style.ContainerForm}>   
           <form onSubmit={handleSubmit}>
            <label htmlFor="">Name:</label>
            <input name="name" onChange={handleChange} type="text" />
            {errors.name}
            <label htmlFor="">Image:</label>
            <input name="image" onChange={handleChange} type="text" />
            <label htmlFor="">Description:</label>
            <input name="description" onChange={handleChange} type="text" />
            {errors.description}
            <label htmlFor="">Released:</label>
            <input name="released" onChange={handleChange} type="text" />
            {errors.released}
            <label htmlFor="">Rating:</label>
            <input name="rating" onChange={handleChange} type="text" />
            {errors.rating}

            <label>Platforms:</label>
            <select name="platforms" id="platforms">
            <option value="" disabled selected>Select platforms to add to the game</option>
                <option value="PC">PC</option>
                <option value="Xbox">Xbox</option>
            </select>
            <button name="platforms" type="button" onClick={handleChange}>Add platforms</button>


            <label>Genres:</label>
            <select  name="genres" id="genres">
            <option value="" disabled selected>Select genres</option>
            {[...allGenres].map((genre)=>(
                <option key={genre.id} value={genre.name}>{genre.name}</option>
            ))}
            </select>
            <button name="genres" type="button" onClick={handleChange}>Add genres</button>


            <input disabled={disabledSubmit()} type="submit" />
           </form>
        </div>
    )
};



export default Form; 