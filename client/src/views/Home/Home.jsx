import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { getAllGames, changePage, getAllGenres} from "../../redux/actions/actions";

const Home = () => {
  const dispatch = useDispatch(); //Le mando una actions a mi store.
  const allGames = useSelector((state) => state.allGames); // Quiero que estes atento a cualquier cambio que ocurre en allGames.
  const currentPage = useSelector((state) => state.currentPage)
  const allGenres = useSelector((state) => state.allGenres)



  useEffect(() => {
    dispatch(getAllGames());
    dispatch(getAllGenres());
  }, [dispatch]);




  const pagination = (event) =>{
    dispatch(changePage(event.target.name))
  };

  return (
    <div>
      <div><h3>Page: {currentPage + 1}</h3></div>
      <div>
      <button onClick={() => dispatch(getAllGames())}>Reset VideoGames</button>
      <div>
      <h3>Filters:</h3>
          <select
            name="genre"
            id="genre"
          >
            <option value="All Genres">All Genres</option>
            {allGenres.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
      </div>
        <button onClick={pagination} name="prev">{"<<"}</button>
        <button onClick={pagination} name="next">{">>"}</button> 
      </div>
      <CardsContainer allGames={allGames} />  
    </div>
  );
};

export default Home;
