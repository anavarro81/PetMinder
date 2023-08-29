// Importa mongoose. Permite conectar bbdd Mongo. 
const mongoose = require('mongoose');  
const dotenv = require('dotenv').config()

// URI de conexión. 
// Se obtiene en Database > Connect (mongoDb)

const user     = process.env.user
const password = process.env.password
const bd = process.env.bd

const DB_URL = `mongodb+srv://${user}:${password}@cluster0.byjnzkt.mongodb.net/${bd}?retryWrites=true&w=majority`;

// Genera la conexion a la BBDD. 
const connect = async () => {
  try {
    const db = await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const { name, host } = db.connection;
    console.log(`Connect to: ${name} host: ${host}`);
  } catch (error) {
    console.log(`He tenido el siguiente problema al conectarme: ${error}`);
  }
};
// Conecta a la BBDD. 
connect();
// Exporta la BBDD. 
module.exports = { connect };