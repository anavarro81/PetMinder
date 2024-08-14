const express = require("express");
const {newRate} = require("../controllers/user.controllers");

const rateRoutes = express.Router();

// register, login, postUser, updateUser, deleteUser



userRoutes.put("/newRate", newRate);






module.exports= {rateRoutes};