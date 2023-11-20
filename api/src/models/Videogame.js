const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type:DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    platforms:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        isUrl:true,
      },
    },
    released:{
      type: DataTypes.DATEONLY, 
      allowNull: false,
    },
    rating:{
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    created:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },{timestamps: false});
};
