import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { getAllGames, changePage, getAllGenres, gamesFilter, filterByGenre,filterByOrigin} from "../../redux/actions/actions";

const Home = () => {
  const dispatch = useDispatch(); //Le mando una actions a mi store.
  const allGames = useSelector((state) => state.allGames); // Quiero que estes atento a cualquier cambio que ocurre en allGames.
  const currentPage = useSelector((state) => state.currentPage)
  const allGenres = useSelector((state) => state.allGenres)



  useEffect(() => {
    if(!allGames.length){
      dispatch(getAllGames())}
    dispatch(getAllGenres());
  }, [dispatch]);

  const pagination = (event) =>{
    dispatch(changePage(event.target.name))
  };

  const filtersOrder = (event) => {
    dispatch(gamesFilter(event.target.value))
  }

  const filterGenres = (event) => {
    dispatch(filterByGenre(event.target.value))
  }


  const filterOrigin = (event) => {
    dispatch(filterByOrigin(event.target.value))
  };
  
  return (
    <div>
      <div>
      <button onClick={() => dispatch(getAllGames())}>Reset VideoGames 🎮</button>
      <div>
      <h3>Filters:</h3>
          <select
            name="genre"
            onChange={filterGenres}
            >
            <option disabled defaultValue={"All"}>All Genres</option>
            {allGenres.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
          <select name="order" id="order" onChange={filtersOrder}>
            <option disabled defaultValue={"Order"}>Order</option>
            <option value="AZ">A-Z</option>
            <option value="ZA">Z-A</option>
          </select>
          <select name="origin" onChange={filterOrigin}>
            <option disabled defaultValue={"Origin"}>Origin</option>
            <option value="api">By Api</option>
            <option value="created">By DB</option>
          </select>
            <div><h3>Page: {currentPage + 1}</h3></div>
      </div>
        <button onClick={pagination} name="prev">{"<<"}</button>
        <button onClick={pagination} name="next">{">>"}</button> 
      </div>
      <CardsContainer allGames={allGames} />  
    </div>
  );
};

export default Home;
