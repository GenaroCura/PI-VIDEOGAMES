import { Link } from "react-router-dom";
import style from "./Card.module.css"

const Card = ({name, image, id, rating, genres}) => { 


    return (
        <div className={style.CardContainer}>
            <Link to={`/detail/${id}`}>
            <img src={image} alt="Imagen de un videoGame" />
            </Link>
            <h2>{name}</h2>
            <h4>Rating: {rating}</h4>
            <h4>Genres: { genres && genres.map(genre => genre.name).join(", ")}</h4>
        </div>
    )
};


export default Card;