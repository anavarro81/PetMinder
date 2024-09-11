const Sit = require ('@models/sits.model')
const buildLogger = require('../plugins/logger.plugin')
import { Request, Response } from 'express';
import {calculateRate, calculateRateTable} from '../utils/rateCalculator'
import { log } from 'console';
const catchAsync = require ('../utils/catchAsync')

const logger = buildLogger('rate.controller.js')

// Define el Interface para el nuevo servicio
interface SitData {
  startDate?: Date;
  endDate?: Date;
  serviceDate?: Date,
  service: string;
  rateType: string;
  petName: string;
  provided: boolean;
  finalPrice: number;
}



catchAsync(async function newWalk(req: Request, res:Response): Promise<Response> {

  const {petName, service, rateType, startDate, endDate, starHour, endHour} = req.body
  
  const price = await calculateRate (service, rateType)

  

  console.log('startDate ', startDate);
  console.log('endDate ', startDate);
  console.log('starHour ', starHour);
  console.log('endHour ', endHour);
  
  // Concatena fecha y hora para convertiro a formato ISO 8601. 
  // Se incluye el separador 'T' entre la fecha y la hora y se indica que ya está en formato UTC con el caracter 'Z' al final. 
  const fechaHoraInicio = `${startDate}T${starHour}Z` 
  const fechaHoraFin = `${endDate}T${endHour}Z` 
  
  // const fechaInicioIso = new Date(fechaHoraInicio).toISOString()
  // const fechaFinIso = new Date(fechaHoraFin).toISOString()

  const fechaInicioIso = new Date(fechaHoraInicio)
  const fechaFinIso = new Date(fechaHoraFin)


  console.log('fechaInicioIso ', fechaInicioIso);
  

  
  

  if (price <= 0) {
    return res.status(404).json({message: `No existe la tarifa: ${service} ${rateType}`});
  }

  req.body.finalPrice = price

  const newSitData: SitData = {
    startDate: fechaInicioIso,
    endDate: fechaFinIso,
    service: service,
    rateType: rateType,
    petName: petName,
    provided: false,
    finalPrice: price,

  }


  try {
  
    const newSit = new Sit(newSitData);
    const createdSit = await newSit.save();
    return res.status(201).json(createdSit);
  } catch (error) {
    logger.error(`Error al crear el servicio: ${error}`);
    return res.status(500).json({ error: `Se ha producido un error al dar de alta el servicio: ${error}` });
  }





})

async function newBoarding(req: Request, res:Response) {
  
  const {petName, service, rateType, startDate, endDate, starHour, endHour} = req.body

  // Obtiene todas las fechas del servicio y sus respectivas tarifas. 
  const rateTable = await calculateRateTable(startDate, endDate, starHour, endHour)

  const sits: SitData[] = []

  for (const sit of rateTable) {

    const newSitData: SitData= {
      serviceDate: sit.date,      
      service: 'alojamiento',            
      rateType: sit.rate,                
      petName: petName,                  
      provided: false,                    
      finalPrice: sit.price                  
    };

    sits.push(newSitData)
  }

    try {
      const newSit = await Sit.insertMany(sits);      
      
      if (!newSit) {
        return res.status(500).json({ error: `Error insertando los registros para el servicio de alojamiento` });  
      }
      return res.status(200).json({ message: `Servicio dado de alta correctamente` });  
    } catch (error) {
      logger.error(`Error al insertar los servicios: ${error}`);
      return res.status(500).json({ error: `Se ha producido un error al dar de alta el servicio: ${error}` });
    }
  
    
  }
  
  

  


async function newSit(req: Request, res:Response): Promise<Response>  { 

  

   const {petName, service, rateType, startDate, endDate, starHour, endHour} = req.body   
   



   if (service === 'paseo') {
    const response = newWalk(req, res)            
    return response
   
  } else {
    const response = await newBoarding(req, res)
    return response
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
 
 // Borra todos los registros
async function deleteAll(req: Request, res:Response): Promise<Response> {
  
  try {
    const result = await Sit.deleteMany({});
    if (!result) {      
      return res.status(404).json({'error': 'Error al borrar los regi' })
    }

    return res.status(200).json({'message': 'Registros borrados correctamente'})
    
  } catch (error) {
    
    return res.status(500).json({'message': error})

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

// Seleccionar los servios de un mes en concreto. 

async function getSitsByMonth(req: Request, res:Response): Promise<Response> { 

  const {month, year} = req.params

  const monthN = Number(month)
  const yearN = Number(year)

  const startDate = new Date (yearN, monthN - 1, 1)
  const endDate =  new Date(yearN, monthN, 1)



  try {

    const monthsSits = await Sit.find({
      $or: [
        {
          startDate: {
            $gte: startDate,
            $lt: endDate,
        },
        },

        {
          serviceDate: {
            $gte: startDate,
            $lt: endDate,
            },
        },

      ],
    })
    
    if (!monthsSits) {
      return res.status(404).json({'message': 'No se han encontrado servicios'})
    }

    return  res.status(200).json(monthsSits)
    
  } catch (error) {
    return res.status(500).json({'error ': `error al recuperar los servicios ${error}`})
  }

}





  module.exports = {newSit, deleteSit, updateSit, deleteAll, getSitsByMonth}