import {NavLink} from "react-router-dom";
import style from "./Landing.module.css";
import mp4Video from "../../assets/PacmanFondoLanding.mp4";

const Landing = () => {
    return (
        <div className={style.LandingContainer}>
            <video autoPlay muted loop className={style.video}>
                <source src={mp4Video} type="video/mp4"/>
            </video>
            <h1> Welcome to the VideoGames app</h1>
            <NavLink to="/home">
                <div className={style.buttonContainer}>
                <button>Go to Home</button>
                </div>
            </NavLink>  
        <div>
            <h4>By Genaro Cura</h4>
        </div>

        </div>
    )
};




export default Landing;