  const cleanAPI = (apiGame) =>
  apiGame.map((game) => {
    return {
      id: game.id,
      name: game.name,
      image: game.background_image,
      released: game.released,
      rating: game.rating,
      platforms: game.platforms,
      genres: game.genres,
      created: false,
    };
  });

  module.exports = {
    cleanAPI
  }