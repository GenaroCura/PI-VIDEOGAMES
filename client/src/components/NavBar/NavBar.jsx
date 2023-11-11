import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";


const NavBar = () => {
    return (
        <div>
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