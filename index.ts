import express, { Request, Response } from 'express';

const app = express();
const cors = require("cors");
const userRoutes = require('./src/routers/user.routes')
const rateRouter = require('./src/routers/rate.routes')
const { connect } = require ('./src/bd')

connect();

app.use(
     cors({
          origin: "*",
          credential: true,
     })
);

app.use(express.json());

app.use("/users", userRoutes);

app.use("/rates", rateRouter)

app.get("/", (req: Request, res: Response) => {
     res.send("Express on Vercel"); 
}); 


const PORT = process.env.PORT || 5000; 

app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });

module.exports = app;