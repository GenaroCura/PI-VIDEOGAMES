const { Videogame, Genres } = require("../db");
require("dotenv").config;
const { API_KEY} = process.env;
const axios = require("axios");
const { cleanAPI } = require("../utils/arrayClean");
const { Op } = require("sequelize");
const IMAGE_DEFAULT = require("../utils/IMAGE_DEFAULT");






 const getGameById = async (id) => {
      //  si el id tiene - significa que esta en la base de datos
       const validate=id.includes("-")
       if (validate){
      
           const dbGame=await Videogame.findOne(
            {where:{ id: id},
            include:[
               {
                 model: Genres,
                 attributes:["name"],
                 through:{attributes:[]}
               }
           ]});
           return dbGame
       }
       else{
           //el game esta en la api
           const {data}=await axios(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
           
           if (data){
               const videoGame={
                           id:data.id,
                           name:data.name,
                           image:data.background_image,
                           platforms:data.platforms,
                           released:data.released,
                           rating:data.rating,
                           genres:data.genres,
                           description:data.description,
                       }
               return videoGame
           }
       }

}
const getAllGame = async () => {
  const gamesApi = [];

  // Me traigo los juegos de la base de datos
  const gameDB = await Videogame.findAll({
    include: [
      {
        model: Genres,
        attributes: ["name"],
        through: { attributes: [] },
      },
    ],
  });
  
  //Cada Pagina de la api tiene 20 juegos, por lo que hago 5 peticiones y me da un total de 100 juegos.
  for (let aux = 1; aux <= 5; aux++) {
    const { data } = await axios(
      `https://api.rawg.io/api/games?key=${API_KEY}&page=${aux}`
      );
      if (data.results) {
      // Recorro el array para poder quedarme las propiedades que necesito
      data.results.forEach((game) => {
        const videoGame = {
          id: game.id,
          name: game.name,
          image: game.background_image,
          released: game.released,
          rating: game.rating,
          platforms: game.platforms,
          genres: game.genres,
          created: false,
        };
        gamesApi.push(videoGame);
      });
    }
  }
  return result = gameDB.concat(gamesApi)
}

const getGameByName = async (name) => {
  // Convierto el nombre a minúsculas para hacer una búsqueda sin distinción entre mayúsculas y minúsculas.
  const Name = name.toLowerCase();
  const games = [];

  const gamesDB = await Videogame.findAll({
    where: {
      name: {
        [Op.iLike]: `%${Name}%`,
      },
    },
    attributes: ["id", "name", "image", "rating", "released", "created"],
    include: {
      model: Genres,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });


  for (let i = 1; i <= 5; i++) {
    const apiResponse = await axios.get(
      `https://api.rawg.io/api/games?name=${Name}&key=${API_KEY}&page=${i}`
    );
    if (apiResponse.data.results) {
      const gamesApi = cleanAPI(apiResponse.data.results);
      games.push(...gamesApi); // Agrego los juegos de la API al array games
    }
  }

  // Aca Filtro los juegos por nombre que coincidan con el valor proporcionado (ignorando mayúsculas y minúsculas).
  const filteredGamesAPI = games.filter((game) =>
    game.name.toLowerCase().includes(Name)
  );

  const result = [...filteredGamesAPI, ...gamesDB];
 
  if (result.length > 0) {
    return result.slice(0,100); 
  } else {
    throw new Error("No se encontraron juegos con ese nombre");
  }
};

  const createVideoGame = async (
    name,
    description,
    platforms,
    image,
    released,
    rating,
    genres
  ) => {
    if(!image){image = IMAGE_DEFAULT}
    const validateGame = await Videogame.findOne({
      where: {
        name: name,
      },
    });

    if (validateGame) {
      throw new Error("Ya existe ese juego");
    }

    const newGame = await Videogame.create({
      name,
      description,
      platforms,
      image,
      released,
      rating,
    });
    newGame.addGenres(genres);

    return newGame;
  };

module.exports = {
  createVideoGame,
  getAllGame,
  getGameByName,
  getGameById,
};
