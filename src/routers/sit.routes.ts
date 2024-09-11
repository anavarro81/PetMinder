import express from 'express';
const {newSit, deleteSit, updateSit, deleteAll, getSitsByMonth} = require("../controllers/sit.controllers")
const sitRoutes = express.Router();


sitRoutes.post("/new-sit", newSit)
sitRoutes.delete("/:id", deleteSit)
sitRoutes.put("/:id", updateSit)
sitRoutes.delete("/delete/all", deleteAll)
sitRoutes.get("/allsits/:month/:year", getSitsByMonth)

module.exports=sitRoutes;