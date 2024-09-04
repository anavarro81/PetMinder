const Sit = require ('../models/sits.model')
const buildLogger = require('../plugins/logger.plugin')
import { Request, Response } from 'express';
import {calculateRate} from '../utils/rateCalculator'

const logger = buildLogger('rate.controller.js')

async function newSit(req: Request, res:Response): Promise<Response>  {
  

  console.log('Estoy en newSit');
  

   const {serviceDate, service, rateType, petName, provided, finalPrice} = req.body   


  const price = await calculateRate (service, rateType)

  if (price <= 0) {
    return res.status(404).json({message: `No existe la tarifa: ${service} ${rateType}`});
  }

  console.log('La tarifa recuperada es: ', price);

  
  // Asignamos la tarifa recuperado de la coleccion de tarifas. 
  req.body.finalPrice = price
  

  try {
  
    const newSit = new Sit(req.body);
    const createdSit = await newSit.save();
    return res.status(201).json(createdSit);
  } catch (error) {
    logger.error(`Error al crear el servicio: ${error}`);
    return res.status(500).json({ error: `Se ha producido un error al dar de alta el servicio: ${error}` });
  }
  }


 // Borrado de servicio
 async function deleteSit(req: Request, res:Response): Promise<Response> {

  try {
    
    const {id} = req.params;
    const deletedSit = await Sit.findByIdAndDelete(id)

    if(!deletedSit) {
      return res.status(404).json({message: `El id: ${id} no existe en la base de datos`})
    }
    
    return res.status(200).json(deleteSit)

  } catch(error) {
    logger.error(`Error al borrar el servicio: ${error}`);
    return res.status(500).json({error: `Se ha producido un error al borrar el servicio: ${error}`})

  }  
  
 }

 // Update 
 async function updateSit(req: Request, res:Response): Promise<Response> {
 
  try {

    const {id} = req.params;

    const {startDate, endDate, service, rateType, petName, provided, finalPrice} = req.body

    const updatedSit = await Sit.findByIdAndUpdate (id, 
      {
        $set: {
          startDate,
          endDate,
          service,
          rateType,
          petName,
          provided,
          finalPrice        
        },        
      },
      {new: true}
    )

    if (!updatedSit) {      
      return res.status(403).json({message: `No existe el servicio con id: ${id}`})
    }

    return res.status(200).json(updatedSit)
    
  } catch (error) {
    logger.error(`Error al crear el servicio: ${error}`);
    return res.status(500).json({error: `Error al actualizar la idea: ${error}`})
  }

}







  module.exports = {newSit, deleteSit, updateSit}