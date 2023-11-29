// Importo servidor. 
const express = require('express');

//! Permite llamar al back desde el FRONT
const cors = require('cors');

// Importo conexión a BBDD.
const { connect } = require('./src/bd');

const routerUser = require('./src/routers/user.routes');


const PORT = 5001;
const app = express();

connect();

//! Permite llamar al back desde el FRONT usando un endpoint diferente. localhost:3000/5000. 
app.use(
  cors({
    origin: "*",    
    //origin: "http://localhost:3001/",
    credentials: true,
  })
);

app.use(express.json());

app.use('/users', routerUser);

app.listen(PORT, () => {
  console.log(`Listening http://localhost:${PORT}`);
});

//
