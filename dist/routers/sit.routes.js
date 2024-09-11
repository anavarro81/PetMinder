"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { newSit, deleteSit, updateSit, deleteAll, getSitsByMonth } = require("../controllers/sit.controllers");
const sitRoutes = express_1.default.Router();
sitRoutes.post("/new-sit", newSit);
sitRoutes.delete("/:id", deleteSit);
sitRoutes.put("/:id", updateSit);
sitRoutes.delete("/delete/all", deleteAll);
sitRoutes.get("/allsits/:month/:year", getSitsByMonth);
module.exports = sitRoutes;
