/* eslint-disable no-empty */
import axios from "axios";
import { DETAIL_GAME, GET_ALLGAMES, GET_ALLGENRES, SEARCH_GAME, CLEAR_DETAIL, PAGINATION, FILTER,FILTER_BY_GENRE,FILTER_BY_RATING, FILTER_BY_ORIGIN} from "./actionsTypes";

export const getAllGames = () => {
    return async function (dispatch){
        try {
            const {data} = await axios.get("http://localhost:3001/videogames")
            dispatch({
                type: GET_ALLGAMES,
                payload: data
            })
        } catch (error) {
            console.log(error)
            
        }
    }
};

export const clearDetail = () => {
    return (dispatch) => {
      dispatch({
        type: CLEAR_DETAIL,
      });
    };
  };

  
export const getGameById = (id) => {
    return async function (dispatch){
        try {
            const response = await axios.get(`http://localhost:3001/videogames/${id}`)
            dispatch({
                type: DETAIL_GAME,
                payload: response.data
            })
        } catch (error) {
            console.log(error)
            
        }
    }
};


export const searchGameName = (name) => {
    return async function (dispatch){
        try {
            const response = await axios.get(`http://localhost:3001/videogames?name=${name}`);
            dispatch({
                type: SEARCH_GAME,
                payload: response.data,
            })
        } catch (error) {
            console.log(error)
            
        }
    }
};


export const getAllGenres = () => {
    return async function (dispatch){
        try {
            const {data} = await axios.get("http://localhost:3001/genres")
            dispatch({
                type:GET_ALLGENRES,
                payload: data
            })
        } catch (error) {
            console.log(error)
            
        }
    }
};


export const changePage = (order) => {
    return async function(dispatch){
        try {
            dispatch(
                {
                    type:PAGINATION,
                    payload: order
                }
            )
        } catch (error) {
            console.log(error)
            
        }
    }
};

export const gamesFilter = (value) => {
    return function(dispatch){
        dispatch({
            type:FILTER,
            payload: value
        })
    }
}

export const filterByGenre = (value) => {
    return function(dispatch){
        dispatch({
            type:FILTER_BY_GENRE,
            payload: value
        })
    }
}
export const filterByRating = (value) => {
    return function(dispatch){
        dispatch({
            type:FILTER_BY_RATING,
            payload: value
        })
    }
};

export const postVideoGame = (body) =>{
    // eslint-disable-next-line no-unused-vars
    return async function (dispatch){
        try {
            console.log(body)
            await axios.post("http://localhost:3001/videogames",body)
            alert("Successfully created videogame")
        } catch (error) {
            alert("Error al crear un videogame")
            
        }
    }
};


export const filterByOrigin = (origin) => {
    return function (dispatch){
        dispatch({
            type: FILTER_BY_ORIGIN,
            payload: origin
        })
    }
};