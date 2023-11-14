import {
  DETAIL_GAME,
  GET_ALLGAMES,
  GET_ALLGENRES,
  SEARCH_GAME,
  CLEAR_DETAIL,
  PAGINATION,
} from "./actions/actionsTypes";

const inicialState = {
  allGames: [],
  allGamesCopy: [],
  allGenres: [],
  allGamesFiltered:[],
  detail: {},
  currentPage: 0,
};

const rootReducer = (state = inicialState, action) => {
  const ITEMS_PER_PAGE = 15;
  switch (action.type) {
    case GET_ALLGAMES:
      return {
        ...state,
        allGames: [...action.payload].splice(0, ITEMS_PER_PAGE), //allGames === 15
        allGamesCopy: action.payload,//total de mis videojuegos (100)
      };
    case GET_ALLGENRES:
      return {
        ...state,
        allGenres: action.payload,  
      };
    case SEARCH_GAME:
      return {
        ...state,
        allGames: action.payload
    
      };
    case DETAIL_GAME:
      return {
        ...state,
        detail: action.payload,
      };
    case CLEAR_DETAIL:
      return {
        ...state,
        detail: {},
      };
    case PAGINATION:
      const next_page= state.currentPage + 1;
      const prev_page= state.currentPage - 1;
      const firstIndex = action.payload === "next" ? next_page * ITEMS_PER_PAGE : prev_page * ITEMS_PER_PAGE;

      //casos de corte
      if(action.payload === "next" && firstIndex >= state.allGamesCopy.length) return state
      if(action.payload === "prev" && firstIndex < 0 ) return state

      return{
        ...state,
        allGames:[...state.allGamesCopy].splice(firstIndex, ITEMS_PER_PAGE),
        currentPage: action.payload === "next" ? next_page : prev_page
      }

    default:
      return {
        ...state,
        allGames: state.allGames
      };
  }
};

export default rootReducer;
