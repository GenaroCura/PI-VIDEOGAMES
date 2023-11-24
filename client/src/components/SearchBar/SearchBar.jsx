    import { useState } from "react";
    import { searchGameName } from "../../redux/actions/actions";
    import { useDispatch } from "react-redux";
    import imageLupa from "../../assets/lupaSearch.png";
    import style from "./SearchBar.module.css";


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
            <div className={style.SearchBarContainer}>
                <form onSubmit={handleSubmit}>
                    <input placeholder="Enter a video game" type="text" id="search" onChange={handleChange}></input>

                    <button type="submit">
                    <img src={imageLupa} alt="Search"/>
                </button>
                </form>
            </div>
        )
    };



    export default SearchBar;
