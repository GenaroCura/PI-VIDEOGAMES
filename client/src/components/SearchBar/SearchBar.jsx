import { useState } from "react";
import { searchGameName } from "../../redux/actions/actions";
import { useDispatch } from "react-redux";


const SearchBar = () => {

    const dispatch = useDispatch();

    const [game, setGame] = useState("");

    const handleChange = (event) =>{
        setGame(event.target.value)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(searchGameName(game))
        document.getElementById("search").value = "";
    }



    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input placeholder="Enter a video game" type="text" id="search" onChange={handleChange}></input>
                <input type="submit" value="Search"/>
            </form>
        </div>
    )
};



export default SearchBar;
