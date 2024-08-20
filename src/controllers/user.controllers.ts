const User = require("../models/user.model");
import express, { Request, Response } from 'express';

const bcrypt = require("bcrypt");
const {
  validateEmail,
  validatePassword,
  usedEmail,
} = require("../utils/validators");
const { generateSign } = require("../utils/jwt");



async function register(req: Request, res:Response): Promise<Response> { 
  
  try {
    const newUser = new User(req.body);
    if (!validateEmail(newUser.email)) {
      return res.status(400).json({ message: " email invalido" });
    }
    if (!validatePassword(newUser.password)) {
      return res.status(400).json({ message: " password invalido" });
    }
    if (await usedEmail(newUser.email)) {
      return res.status(400).json({ message: " email introducido ya existe" });
    }    

    newUser.password = bcrypt.hashSync(newUser.password, 10);    

    const createdUser = await newUser.save();

    return res.status(201).json(createdUser);
  } catch (error) {
    return res.status(500).json(error);
  }
};


async function login(req: Request, res: Response): Promise<Response> {  

  try {  
    const userInfo = await User.findOne({ email: req.body.email })    

    if (!userInfo) {
      return res.status(404).json({ message: "email no encontrado" });
    }         

    if (!bcrypt.compareSync(req.body.password, userInfo.password)) {
      return res.status(404).json({ message: "password incorrecto" });
    }  
    
    const token = generateSign(userInfo._id, userInfo.email);   

     userInfo.password = undefined

    return res.status(200).json({ user: userInfo, token: token, role: userInfo.role, id: userInfo._id});
  } catch (error) {
    console.log('Error en el login ',  error);
    return res.status(500).json(error);
  }
};

// Obtiene todos los usuarios
// const getUsers = async (req, res) => {
async function getUsers(req:Request, res: Response): Promise<Response> { 
  try {
    const allUser = await User.find()
    return res.status(200).json(allUser);
  } catch (error) {
    return res.status(500).json(error);
  }
};

  // const getUser = async (req, res) => {
  async function getUser(req: Request, res: Response): Promise<Response> {     
    try {      
      const { id } = req.params;
      const selectedUser = await User.findById(id)

      if (!selectedUser) {
        return res.status(404).json({message: `No encontra usuario con id: ${id}` })          
      }
      
      return res.status(200).json(selectedUser)          

    } catch (error) {
      return res.status(500).json({error: `Se ha producido un error al obtener el usuario: ${error}`})
    }
  }
  
  // Actualia nombre y correo del usuario. 
  
    async function updateUser(req: Request, res:Response): Promise<Response>  {

    

    try {
      const { id } = req.params;
      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          $set: {
            name: req.body.name,
            email: req.body.email
          }
        },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "no existe este id de usuario" });
      }
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json(error);
    }
  };


  // Borra usuario.
  // const deleteUser = async (req, res) => {

async function deleteUser(req: Request, res:Response): Promise<Response>  { 
    try {
      const {id} = req.params;
      const deletedUser = await User.findByIdAndDelete(id)
      if (!deletedUser) {
          return res.status(404).json({message:"este id no existe"})
      }
      return res.status(200).json(deletedUser);
    } catch (error) {
      return res.status(500).json(error)
    }
  };

  



module.exports = { register, login, updateUser, deleteUser, getUsers, getUser  };
