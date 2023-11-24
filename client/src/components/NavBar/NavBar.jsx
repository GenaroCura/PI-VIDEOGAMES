import { NavLink} from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import style from "./NavBar.module.css";
import iconNav from "../../assets/IconoParaNav.png"


const NavBar = () => {
    return (
        <div className={style.NavBarContainer}>
            <img src={iconNav} alt="Icono" className={style.iconNav}></img>
            <NavLink to="/" className={style.buttonExit}>    
            <button>
                Exit
            </button>
            </NavLink>
            <NavLink to="/home" className={style.navLink}>
                Home
            </NavLink>
            <NavLink to="/create" className={style.navLink}>
                    Create Videogame 
            </NavLink>
            <SearchBar></SearchBar>

        </div>
    )
};





export default NavBar;