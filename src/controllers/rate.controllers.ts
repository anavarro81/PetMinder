const Rate = require ('../models/rates.model')
const maxDate = new Date('9999-12-31T23:59:59.999Z');
const buildLogger = require('../plugins/logger.plugin')
import { log } from 'console';
import { Request, Response } from 'express';

interface rateI {

  id: string,
  price: number

}

const logger = buildLogger('rate.controller.js')

async function newRate(req: Request, res:Response): Promise<Response>  {
  

  const {rate, price, endDate} = req.body 

  try {
  
    const existRate = await Rate.find({rate: rate})

    console.log('existRate > ', existRate);
    

    if (existRate.length > 0) {
      return res.status(409).json({error: `Ya existe una tarifa con el nombre: ${rate}`});  
    }
  
    const newRate = new Rate(req.body);
    const createdRate = await newRate.save();
    return res.status(201).json(createdRate);
  } catch (error) {
    logger.error(`Error al crear la tarifa: ${error}`);
    return res.status(500).json({ error: `Se ha producido un error al dar de alta la nueva tarifa: ${error}` });
  }
  }


async function getActiveRates(req: Request, res: Response): Promise<Response> {
  try {
    const allRates = await Rate.find()     
    
    return res.status(200).json(allRates);
  } catch (error) {
    return res.status(500).json(error);
  }  
}       

async function updateRates(req: Request, res:Response): Promise<Response> {
  const {rates} = req.body

  console.log('rates: ', rates);
  const updatedRates = []

  for (const rate of rates) {
    try {      
      const updateRate = await Rate.findByIdAndUpdate(rate.id, 
        {$set: {price: rate.price}},      
        {new: true}
        )
        
        if (updateRate) {
          updatedRates.push(updateRate)
        }        
        
      
    } catch (error) {
      return res.status(500).json({error: `error actualizando la tarifas ${error}`});
    }

  }

  return res.status(200).json({'message': 'Tarifa(s) actualizadas correctamente', 'updatedRates': updatedRates});
  
}


module.exports = {newRate, getActiveRates, updateRates}