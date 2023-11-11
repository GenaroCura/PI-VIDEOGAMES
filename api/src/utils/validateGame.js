// Esta funcion va a actuar como un middleware; Protego mi base de datos , mientras createDriverHandler este mas lejos de mi bdd mejor. 
// Con esto , me aseguro que createDriverHandler no llegue ni al controlador porque esta validacion va a ser que si hay algun error, no se cree el driver.


const validateGame = (req,res,next) => {
    const {name,description,platforms,image,released,rating,genres} = req.body;
    if (!name) return res.status(400).json({error: "Missing name"});
    if (!description) return res.status(400).json({error: "Missing description"});
    if (!platforms) return res.status(400).json({error: "Missing platforms"}); 
    if (!released) return res.status(400).json({error: "Missing released"});
    if (!rating) return res.status(400).json({error: "Missing rating"});
    if (!genres) return res.status(400).json({error: "Missing genres"});

    next();
}

module.exports = {
    validateGame
};