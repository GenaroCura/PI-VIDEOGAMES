const {Router} = require("express");
const {createVideoGameHandler, getAllGameHandler, getDetailGameHandler} = require("../handlers/gamesHandlers");
const {validateGame} = require("../utils/validateGame");

const gamesRouter = Router();


gamesRouter.get("/", getAllGameHandler);
gamesRouter.get("/:id", getDetailGameHandler);
gamesRouter.post("/",validateGame, createVideoGameHandler);


module.exports = gamesRouter;