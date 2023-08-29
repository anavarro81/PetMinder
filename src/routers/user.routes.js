//-> [1]: Imporo el servidor
const express = require('express');

//-> [2]: Instancio
const router = express.Router();

//Importar las funciones controladores
const {
  getUsers
} = require('../controllers/user.controllers');

//-Asociar las funciones a los endpoints
router.get('/allusers', getUsers);

//-> [5]: Exporto el enrutador.
module.exports = router;