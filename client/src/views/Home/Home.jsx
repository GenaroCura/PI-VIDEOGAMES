import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { getAllGames, changePage, getAllGenres, gamesFilter, filterByGenre,filterByRating, filterByOrigin} from "../../redux/actions/actions";

const Home = () => {
  const dispatch = useDispatch(); //Le mando una actions a mi store.
  const allGames = useSelector((state) => state.allGames); // Quiero que estes atento a cualquier cambio que ocurre en allGames.
  const allGenres = useSelector((state) => state.allGenres)
  const currentPage = useSelector((state) => state.currentPage)


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


  
  const filterRating = (event) =>{
    dispatch(filterByRating(event.target.value))
  }

//   //Aplico Esto para realizar la busqueda por origen.
//   const [selectedOrigin, setSelectedOrigin] = useState("all");
  
// const filteredByOrigin = allGames.filter(game => {
//   if (selectedOrigin === "db"){
//     return game.created === true;
//   }else if (selectedOrigin === "api"){
//     return game.created === false;
//   }
//   return true
// })

const filterOrigin = (event)=> {
  dispatch(filterByOrigin(event.target.value))
}
  
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
            <option disabled selected defaultValue={"All"}>All 🧬</option>
            {allGenres.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
          <select name="order" id="order" onChange={filtersOrder}>
            <option value="all"  disabled>All 🕹</option>
            <option value="AZ">A-Z</option>
            <option value="ZA">Z-A</option>
          </select>
          <select name="origin" onChange={filterOrigin}>
            <option value="all">All Origin ⚙</option>
            <option value="api">By Api</option>
            <option value="db">By DB</option>
          </select>
          <select name="rating" id="rating" onChange={filterRating}>Rating
          <option value="all" disabled>All rating 🔥</option>
          <option value="high">Rating high</option>
          <option value="low">Rating low</option>
          </select>
      </div>
            <div><h3>{currentPage + 1}</h3></div>
        <button onClick={pagination} name="prev">{"<<"}</button>
        <button onClick={pagination} name="next">{">>"}</button> 
      </div>
      <CardsContainer allGames={allGames} />  
    </div>
  );
};

export default Home;
