"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { newSit, deleteSit, updateSit } = require("../controllers/sit.controllers");
const sitRoutes = express_1.default.Router();
sitRoutes.post("/new-sit", newSit);
sitRoutes.delete("/:id", deleteSit);
sitRoutes.put("/:id", updateSit);
module.exports = sitRoutes;
