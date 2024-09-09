"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors = require("cors");
// const userRoutes = require('./src/routers/user.routes');
const rateRouter = require('./src/routers/rate.routes');
const sitRoutes = require('./src/routers/sit.routes');
const { connect } = require('./src/bd');
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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });
module.exports = app;
