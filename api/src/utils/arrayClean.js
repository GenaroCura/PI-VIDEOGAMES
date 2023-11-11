const cleanAPI = (apiGame) =>
apiGame.map((game) => {
  return {
    id: game.id,
    name: game.name,
    image: game.background_image,
    released: game.released,
    rating: game.rating,
    platforms: game.platforms.map((elem) => elem.platform.name).join(","),
    genres: game.genres?.map((elem) => elem.name).join(", "),
    created: false,
  };
});



module.exports = {
  cleanAPI
}