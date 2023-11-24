import { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { getAllGames, changePage, getAllGenres, gamesFilter, filterByGenre,filterByRating,reset, filterByOrigin,} from "../../redux/actions/actions";
import style from "./Home.module.css";
import izqPag from "../../assets/izquierdaPag.png";
import derechaPag from "../../assets/derechaPag.png";
import refresh from "../../assets/refreshIcon.png";

const Home = () => {
  const dispatch = useDispatch(); //Le mando una actions a mi store.
  const allGames = useSelector((state) => state.allGames); // Quiero que estes atento a cualquier cambio que ocurre en allGames.
  const allGenres = useSelector((state) => state.allGenres)
  const currentPage = useSelector((state) => state.currentPage)
  const videogames = useSelector ((state) => state.allGamesFiltered)

  let totalPages = Math.ceil(videogames.length / 15)
  if(!videogames.length) {
      totalPages = 7
  }

  
  useEffect(() => {
      dispatch(getAllGames())
      dispatch(getAllGenres());
  }, []);

  const handleReset = () => {
    dispatch(reset());
  };

  const pagination = (event) =>{
    dispatch(changePage(event.target.name))
  };

  const filtersOrder = (event) => {
    dispatch(gamesFilter(event.target.value))
  }

  const filterGenres = (event) => {
    dispatch(filterByGenre(event.target.value))
  }

  
  const filterRating = (event) =>{
    dispatch(filterByRating(event.target.value))
  }


const [selectedOrigin, setSelectedOrigin] = useState("all");
  
const filterOrigin = allGames.filter(game => {
  if (selectedOrigin === "db"){
    return game.created === true;
  }else if (selectedOrigin === "api"){
    return game.created === false;
  }
  return true
})

const FilteredByOrigin = (event) => {
  const selectedOrigin = event.target.value;
  setSelectedOrigin(selectedOrigin)
  dispatch(filterByOrigin(selectedOrigin));
};

  
  return (
    <div className={style.HomeContainer}>
      <div>
        <div className={style.FilterContainer}>

      <img src={refresh} alt="icono"onClick={handleReset}></img>
      <div>
      <h3>Filters / Orders</h3>
          <select
            name="genre"
            onChange={filterGenres}
            >
            <option disabled ={"All"}>All 🧬</option>
            {allGenres.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
          <select name="origin" onChange={FilteredByOrigin}>
            <option value="all">All Origin ⚙</option>
            <option value="api">By Api</option>
            <option value="db">By DB</option>
          </select>
          <select name="order" id="order" onChange={filtersOrder}>
            <option value="all"  disabled>All 🕹</option>
            <option value="AZ">A-Z</option>
            <option value="ZA">Z-A</option>
          </select>
          <select name="rating" id="rating" onChange={filterRating}>Rating
          <option value="all" disabled>All rating 🔥</option>
          <option value="high">Rating high</option>
          <option value="low">Rating low</option>
          </select>
          </div>
        <div className={style.ButtonPag}>
        <img src={izqPag} alt="Flecha" onClick={pagination} name="prev"></img>
        <div><h3>Page {currentPage + 1} - {totalPages}</h3></div>
        <img  src={derechaPag} alt="Flecha"onClick={pagination} name="next"></img> 
        </div>
      </div>
      </div>
      <CardsContainer allGames={filterOrigin} />  
    </div>
  );
};

export default Home;
