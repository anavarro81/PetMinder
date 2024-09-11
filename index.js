"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors = require("cors");
// const userRoutes = require('./src/routers/user.routes')
const rateRouter = require('./src/routers/rate.routes');
const sitRoutes = require('./src/routers/sit.routes');
const { connect } = require('./src/bd');
const globalErrorHandler = require('./src/middlewares/globalErrorHandler');
connect();
app.use(cors({
    origin: "*",
    credential: true,
}));
app.use(express_1.default.json());
// app.use("/users", userRoutes);
app.use("/rates", rateRouter);
app.use("/sit", sitRoutes);
app.get("/", (req, res) => {
    res.send("Express on Vercel");
});
// Aplica a todas las rutas. 
app.all('*', (req, res, next) => {
    res.status(404).json({ 'status ': 'No encontrado' });
});
app.use(globalErrorHandler);
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });
// Gestiona los eventos del servidor
process.on('unhandleRejection', error => {
    // Cierra el servidor
    server.close(() => {
        // Apaga el servidor
        process.exit(1);
    });
});
process.on('uncaughtException', error => {
    // Errores no manejados en la aplicación. 
    console.log('error en el servidor: ', error);
    // Cierra el servidor
    server.close(() => {
        // Apaga el servidor
        process.exit(1);
    });
});
module.exports = app;
