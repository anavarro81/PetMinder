"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const maxDate = new Date('9999-12-31T23:59:59.999Z');
const ratesSchema = new Schema({
    rate: { type: String,
        required: true,
        enum: ['paseo laborable', 'paseo festivo', 'alojamiento laborable', 'alojamiento festivo'],
        unique: true
    },
    price: {
        type: Number,
        required: true,
        min: 1
    },
}, {
    timestamps: true,
});
const rate = mongoose_1.default.model("Rates", ratesSchema);
module.exports = rate;
