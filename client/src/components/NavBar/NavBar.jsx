import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import style from "./NavBar.module.css";


const NavBar = () => {
    return (
        <div className={style.NavBarContainer}>
            NavBar
            <SearchBar></SearchBar>
            <NavLink to="/home">
                <button>Home</button>
            </NavLink>


            <NavLink to="/create">
                <button>
                    Create Videogame
                </button>
            </NavLink>


            <NavLink to="/">    
                <button>
                    Exit
                </button>
            </NavLink>

        </div>
    )
};





export default NavBar;