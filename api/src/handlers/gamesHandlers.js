const {
  createVideoGame,
  getAllGame,
  getGameByName,
  getGameById,
} = require("../controllers/videoGamesControllers");

const getDetailGameHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getGameById(id);

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllGameHandler = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const gameByName = await getGameByName(name);
      res.status(200).json(gameByName);
    } else {
      const allGames = await getAllGame();
      res.status(200).json(allGames);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createVideoGameHandler = async (req, res) => {
  const { name, description, platforms, image, released, rating, genres} =
    req.body;
  try {
    const result = await createVideoGame(
      name,
      description,
      platforms,
      image,
      released,
      rating,
      genres,
    );
    res.status(200).json(result);   
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createVideoGameHandler,
  getAllGameHandler,
  getDetailGameHandler,
};
