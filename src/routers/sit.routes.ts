import express from 'express';
const {newSit} = require("../controllers/sit.controllers")
const sitRoutes = express.Router();


sitRoutes.put("/new-sit", newSit)

module.exports= sitRoutes;