import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { getAllGames } from "../../redux/actions/actions";

const Home = () => {
  const dispatch = useDispatch(); //Le mando una actions a mi store.
  const allGames = useSelector((state) => state.allGames); // Quiero que estes atento a cualquier cambio que ocurre en allGames.

  useEffect(() => {
    dispatch(getAllGames());
  }, [dispatch]);

//   return (()=>{  Esto tengo que agregarlo para limpiar el estado cuando me salga de la pagina.
//     clearDetail()
//   })

  return (
    <div>
      <h1>Esta es la View Del Home!!</h1>
      <CardsContainer allGames={allGames} />
    </div>
  );
};

export default Home;
