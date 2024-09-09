"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const sitsSchema = new Schema({
    startDate: { type: Date,
        required: true,
    },
    endDate: { type: Date,
        required: true,
    },
    service: {
        type: String,
        required: true,
        enum: ['paseo', 'alojamiento']
    },
    rateType: {
        type: String,
        required: true,
        enum: ['festivo', 'laborable']
    },
    petName: {
        type: String,
        required: true,
    },
    provided: {
        type: Boolean,
        require: true,
        default: 'false'
    },
    finalPrice: {
        type: Number,
        require: true,
    }
}, {
    timestamps: true,
});
const sit = mongoose_1.default.model("Sits", sitsSchema);
module.exports = sit;
