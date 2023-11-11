const {getGenresController} = require("../controllers/genresControllers");

const getGenresHandler=async(req,res)=>{
    try {
        const response = await getGenresController()
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}

module.exports= {getGenresHandler};