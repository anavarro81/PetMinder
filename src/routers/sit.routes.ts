import express from 'express';
const {newSit, deleteSit} = require("../controllers/sit.controllers")
const sitRoutes = express.Router();


sitRoutes.put("/new-sit", newSit)
sitRoutes.delete("/:id", deleteSit)

module.exports= sitRoutes;