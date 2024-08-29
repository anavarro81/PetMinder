const Sit = require ('../models/sits.model')
const buildLogger = require('../plugins/logger.plugin')
import { Request, Response } from 'express';


const logger = buildLogger('rate.controller.js')

async function newSit(req: Request, res:Response): Promise<Response>  {
  

//   const {serviceDate, service, rateType, petName, provided, finalPrice} = req.body 

  try {
  
    const newSit = new Sit(req.body);
    const createdSit = await newSit.save();
    return res.status(201).json(createdSit);
  } catch (error) {
    logger.error(`Error al crear el servicio: ${error}`);
    return res.status(500).json({ error: `Se ha producido un error al dar de alta el servicio: ${error}` });
  }
  }


  module.exports = {newSit}