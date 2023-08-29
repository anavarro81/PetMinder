//Importar el modelo
const User = require('../models/user.model');

//Funciones controladores.

//Obtener todos los datos de BD
const getUsers = async (req, res) => {
  try {
    const allUsers = await User.find(); 
    return res.status(200).json(allUsers); 
  } catch (error) {
    return res.status(500).json(error);
  }
};


//Funciones controladores. 
module.exports = {getUsers};