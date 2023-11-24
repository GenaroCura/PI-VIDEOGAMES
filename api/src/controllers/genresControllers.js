require('dotenv').config();
const {API_KEY} = process.env;


const {Genres}=require("../db")
const axios= require("axios")


//Aca lo que voy a hacer es interactuar con la base de datos y 
//la api externa para obtener informacion y almacenarla de forma actualizada en mi bdd.


const getGenresController=async()=>{
    //llamo a la base de datos
    const dataBaseGenres=Genres.findAll()

    const {data} = (await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`));

    const genresArray= data.results.map(genres=>{
        const videoGame={
            id: genres.id,
            name:genres.name
        }
        return videoGame    
    })
    if (data.results && !(await dataBaseGenres).length){
        const genres=await Genres.bulkCreate(genresArray);

        return genres
    }
    return genresArray
}

module.exports = {getGenresController};