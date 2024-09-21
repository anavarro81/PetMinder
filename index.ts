import 'module-alias/register';
import express, { NextFunction, Request, Response } from 'express';

const app = express();
const cors = require("cors");
// const userRoutes = require('./src/routers/user.routes')
const rateRouter = require('./src/routers/rate.routes')
const sitRoutes = require('./src/routers/sit.routes')
const { connect } = require ('./src/bd')
const globalErrorHandler = require ('./src/middlewares/globalErrorHandler')

connect();

app.use(
     cors({
          origin: "*",
          credential: true,
     })
);

app.use(express.json());

// app.use("/users", userRoutes);
app.use("/rates", rateRouter)
app.use("/sit", sitRoutes)

app.get("/", (req: Request, res: Response) => {
     res.send("Express on Vercel"); 
}); 


// Se ejecuta para todas las rutas que no hayan sido definidas. 
app.all('*', (req: Request, res: Response, next:NextFunction )=> {
     
     res.status(404).json({'status ': 'No encontrado'})
}) 

// app.use(globalErrorHandler)

const PORT = process.env.PORT || 5000; 

const server = app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });

//Se activa cuando ocurre una promesa rechazada que no tiene un manejador de errores (catch)
process.on('unhandleRejection', error => {

     // Cierra el servidor
     server.close(()=> {
          // Apaga el servidor
          process.exit(1)
     })
     
})
// Se activa cuando ocurre un error no controlado en la aplicación, es decir, un error que no fue capturado por ningún try-catch  
process.on('uncaughtException', error => {    
     
     console.log('error en el servidor: ', error);     
     //Cierra el servidor y termina el proceso de la aplicación
     server.close(()=> {
          // Apaga el servidor
          process.exit(1)
     })
     
})


module.exports = app;