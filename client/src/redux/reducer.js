import { DETAIL_GAME, GET_ALLGAMES, GET_ALLGENRES, SEARCH_GAME } from "./actions/actionsTypes";


const inicialState = {
    allGames:[],
    allGamesCopy:[],
    allGenres:[],
    detail:{},

}


const rootReducer = (state= inicialState, action) =>{
    switch (action.type){
        case GET_ALLGAMES:
            return{
                ...state,
                allGames:action.payload,
                allGamesCopy:action.payload
            }
        case GET_ALLGENRES:
            return{
                ...state,
                allGenres:action.payload

            }
        case SEARCH_GAME:
            return{
                ...state,
                allGames:action.payload
            }
        case DETAIL_GAME:
            return{
                ...state,
                detail: action.payload

            }
        default:
            return{
                ...state
            }


    }
};




export default rootReducer;