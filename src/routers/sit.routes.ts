import express from 'express';
const {newSit, deleteSit, updateSit} = require("../controllers/sit.controllers")
const sitRoutes = express.Router();


sitRoutes.post("/new-sit", newSit)
sitRoutes.delete("/:id", deleteSit)
sitRoutes.put("/:id", updateSit)

module.exports=sitRoutes;