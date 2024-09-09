"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { validateEmail, validatePassword, usedEmail, } = require("../utils/validators");
const { generateSign } = require("../utils/jwt");
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newUser = new User(req.body);
            if (!validateEmail(newUser.email)) {
                return res.status(400).json({ message: " email invalido" });
            }
            if (!validatePassword(newUser.password)) {
                return res.status(400).json({ message: " password invalido" });
            }
            if (yield usedEmail(newUser.email)) {
                return res.status(400).json({ message: " email introducido ya existe" });
            }
            newUser.password = bcrypt.hashSync(newUser.password, 10);
            const createdUser = yield newUser.save();
            return res.status(201).json(createdUser);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    });
}
;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userInfo = yield User.findOne({ email: req.body.email });
            if (!userInfo) {
                return res.status(404).json({ message: "email no encontrado" });
            }
            if (!bcrypt.compareSync(req.body.password, userInfo.password)) {
                return res.status(404).json({ message: "password incorrecto" });
            }
            const token = generateSign(userInfo._id, userInfo.email);
            userInfo.password = undefined;
            return res.status(200).json({ user: userInfo, token: token, role: userInfo.role, id: userInfo._id });
        }
        catch (error) {
            console.log('Error en el login ', error);
            return res.status(500).json(error);
        }
    });
}
;
// Obtiene todos los usuarios
// const getUsers = async (req, res) => {
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allUser = yield User.find();
            return res.status(200).json(allUser);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    });
}
;
// const getUser = async (req, res) => {
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const selectedUser = yield User.findById(id);
            if (!selectedUser) {
                return res.status(404).json({ message: `No encontra usuario con id: ${id}` });
            }
            return res.status(200).json(selectedUser);
        }
        catch (error) {
            return res.status(500).json({ error: `Se ha producido un error al obtener el usuario: ${error}` });
        }
    });
}
// Actualia nombre y correo del usuario. 
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const updatedUser = yield User.findByIdAndUpdate(id, {
                $set: {
                    name: req.body.name,
                    email: req.body.email
                }
            }, { new: true });
            if (!updatedUser) {
                return res.status(404).json({ message: "no existe este id de usuario" });
            }
            return res.status(200).json(updatedUser);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    });
}
;
// Borra usuario.
// const deleteUser = async (req, res) => {
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const deletedUser = yield User.findByIdAndDelete(id);
            if (!deletedUser) {
                return res.status(404).json({ message: "este id no existe" });
            }
            return res.status(200).json(deletedUser);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    });
}
;
module.exports = { register, login, updateUser, deleteUser, getUsers, getUser };
