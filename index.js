const express = require("express"); 
const app = express();
const cors = require("cors");
const userRoutes = require('./src/routers/user.routes')
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

app.get("/", (req, res) => {
     res.send("Express on Vercel"); 
}); 


const PORT = process.env.PORT || 5000; 

app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });

module.exports = app;