require('dotenv').config();
const {API_KEY} = process.env;


const {Genres}=require("../db")
const axios= require("axios")

const getGenresController=async()=>{
    //llamo a la base de datos
    const dataBaseGenres=Genres.findAll()

    const {data} = (await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`));
    //si no hay nada en la base de datos

    const genresArray= data.results.map(genres=>{
        const videoGame={
            id: genres.id,
            name:genres.name
        }
        return videoGame
    })
    if (data.results && !(await dataBaseGenres).length){
        //para crear los generos en la base de datos
        const genres=await Genres.bulkCreate(genresArray);

        return genres
    }
    return genresArray
}

module.exports = {getGenresController};

// require('dotenv').config();
// const { API_KEY } = process.env;

// const { Genres } = require('../db');
// const axios = require('axios');

// const getGenresController = async () => {
//     const dataBaseGenres = Genres.findAll();

//     const { data } = await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`);

//     if (data.results && !(await dataBaseGenres).length) {
//         const genresArray = data.results.map((genre) => genre.name);

//         // Crear los géneros en la base de datos si no existen
//         await Genres.bulkCreate(genresArray.map((name) => ({ name })));

//         return genresArray;
//     }

//     const genresArray = (await dataBaseGenres).map((genre) => genre.name);

//     return genresArray;
// };

// module.exports = { getGenresController};