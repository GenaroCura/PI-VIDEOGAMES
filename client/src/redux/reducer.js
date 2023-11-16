import {
  DETAIL_GAME,
  GET_ALLGAMES,
  GET_ALLGENRES,
  SEARCH_GAME,
  CLEAR_DETAIL,
  PAGINATION,
  FILTER,
  FILTER_BY_GENRE,
  FILTER_BY_RATING,
} from "./actions/actionsTypes";

const inicialState = {
  allGames: [],
  allGamesCopy: [],


  allGenres: [],

  allGamesFiltered: [],//para guardar luego de un filtrado. Por ejemplo por name.

  filters: false,// para saber si hay un filtrado.


  detail: {}, //Para limpiar el detalle y volver a entrar.
  currentPage: 0,
};

const rootReducer = (state = inicialState, action) => {
  const ITEMS_PER_PAGE = 15;
  switch (action.type) {
    case GET_ALLGAMES:
      return {
        ...state,
        allGames: [...action.payload].splice(0, ITEMS_PER_PAGE), //allGames === 15
        allGamesCopy: action.payload, //total de mis videojuegos (100)
        allGamesFiltered: [], 
        filters: false, 
        currentPage: 0,
      };

    case SEARCH_GAME:
      return {
        ...state,
        allGames: [...action.payload].splice(0, ITEMS_PER_PAGE),
        allGamesFiltered: action.payload,
        filters: true,
        currentPage: 0,
      };
    case GET_ALLGENRES:
      return {
        ...state,
        allGenres: action.payload,
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
      const next_page = state.currentPage + 1;
      const prev_page = state.currentPage - 1;
      const firstIndex =
        action.payload === "next"
          ? next_page * ITEMS_PER_PAGE
          : prev_page * ITEMS_PER_PAGE;

      if (state.filters) {
        if (
          action.payload === "next" &&
          firstIndex >= state.allGamesFiltered.length
        )
          return state;
        else if (action.payload === "prev" && firstIndex < 0) return state;
        return {
          ...state,
          allGames: [...state.allGamesFiltered].splice(
            firstIndex,
            ITEMS_PER_PAGE
          ),
          currentPage: action.payload === "next" ? next_page : prev_page,
        };
      }
      //casos de corte
      if (action.payload === "next" && firstIndex >= state.allGamesCopy.length)
        return state;
      else if (action.payload === "prev" && firstIndex < 0) return state;

      return {
        ...state,
        allGames: [...state.allGamesCopy].splice(firstIndex, ITEMS_PER_PAGE),
        currentPage: action.payload === "next" ? next_page : prev_page,
      };

    case FILTER:
       if (action.payload === "AZ") {
        let asc = [];
        if (state.filters) {
          asc = [...state.allGamesFiltered].sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          });
          return {
            ...state,
            allGames: [...asc].slice(0, ITEMS_PER_PAGE),
            allGamesFiltered: asc,
            currentPage: 0,
          };
        } else{
          asc = [...state.allGamesCopy].sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          });
          return {
            ...state,
            allGames: [...asc].slice(0, ITEMS_PER_PAGE),
            allGamesCopy: asc,
            currentPage: 0,
          };
        }
      } else {
        let desc = [];
        if (state.filters) {
          desc = [...state.allGamesFiltered].sort((a, b) => {
            if (a.name < b.name) return 1;
            if (a.name > b.name) return -1;
            return 0;
          });
          return {
            ...state,
            allGames: [...desc].slice(0, ITEMS_PER_PAGE),
            allGamesFiltered: desc,
            currentPage: 0,
          };
        } else {
          desc = [...state.allGamesCopy].sort((a, b) => {
            if (a.name < b.name) return 1;
            if (a.name > b.name) return -1;
            return 0;
          });
          
          return {
            ...state,
            allGames: [...desc].slice(0, ITEMS_PER_PAGE),
            allGamesCopy: desc,
            currentPage: 0,
          };
      }
    }
      case FILTER_BY_GENRE:
        let genreFiltered = [...state.allGamesCopy].filter((game)=>game.genres?.map(elem=>elem.name).includes(action.payload));
        return {
          ...state,
          allGames:[...genreFiltered].slice(0,ITEMS_PER_PAGE),
          allGamesFiltered: genreFiltered,
          currentPage:0,
          filters:true
        }
        case FILTER_BY_RATING:
          const ratingFilterType = action.payload;
          let ratingFiltered = [...state.allGamesCopy]; // Usar allGamesCopy para asegurar que filtras desde todos los juegos
        
          if (state.filters) {
            // Filtrar por rating solo si hay filtros previos
            if (ratingFilterType === "high") {
              ratingFiltered = [...state.allGamesFiltered].sort((a, b) => b.rating - a.rating);
            } else if (ratingFilterType === "low") {
              ratingFiltered = [...state.allGamesFiltered].sort((a, b) => a.rating - b.rating);
            }
          } else {
            // Filtrar por rating desde todos los juegos si no hay filtros previos
            if (ratingFilterType === "high") {
              ratingFiltered = ratingFiltered.sort((a, b) => b.rating - a.rating);
            } else if (ratingFilterType === "low") {
              ratingFiltered = ratingFiltered.sort((a, b) => a.rating - b.rating);
            }
          }

          return {
            ...state,
            allGames: [...ratingFiltered].slice(0, ITEMS_PER_PAGE),
            allGamesFiltered: ratingFiltered,
            currentPage: 0,
            filters: true,
        };
        
  // case FILTER_BY_ORIGIN:
  // switch (action.payload) {
  //   case "created":
  //     let created = [...state.allGamesCopy].filter((game) => game.created);
  //     return {
  //       ...state,
  //       allGames: [...created].slice(0, ITEMS_PER_PAGE),
  //       allGamesFiltered: created,
  //       currentPage: 0,
  //       filters: true,
  //     };
  //   case "api":
  //     let api = [...state.allGamesCopy].filter((game) => !game.created);
  //     return {
  //       ...state,
  //       allGames: [...api].slice(0, ITEMS_PER_PAGE),
  //       allGamesFiltered: api,
  //       currentPage: 0,
  //       filters: true,
  //     };
  //   case "all":
  //     return {
  //       ...state,
  //       allGames: [...state.allGamesCopy].slice(0, ITEMS_PER_PAGE),
  //       allGamesFiltered: state.allGamesCopy,
  //       currentPage: 0,
  //       filters: true,
  //     };


  //   default:
  //     return state;
  // }

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
