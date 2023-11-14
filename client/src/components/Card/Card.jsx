import { Link } from "react-router-dom";
import style from "./Card.module.css"

const Card = ({game}) => { 

    

    return (
        <div className={style.CardContainer}>
            <Link to={`/detail/${game.id}`}>
            <img src={game.image} alt="Imagen de un videoGame" />
            </Link>
            <h2>{game.name}</h2>
            <h3>Genres: {game.genres.map(genre => genre.name).join(", ")}</h3>
        </div>
    )
};


export default Card;