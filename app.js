// Importo servidor. 
const express = require('express');

// Importo conexión a BBDD.
const { connect } = require('./src/bd');

const routerUser = require('./src/routers/user.routes');


const PORT = 5001;
const app = express();

connect();

app.use(express.json());

app.use('/users', routerUser);

app.listen(PORT, () => {
  console.log(`Listening http://localhost:${PORT}`);
});

//