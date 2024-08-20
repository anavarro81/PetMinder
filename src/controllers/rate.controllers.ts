const Rate = require ('../models/rates.model')
const maxDate = new Date('9999-12-31T23:59:59.999Z');
const buildLogger = require('../plugins/logger.plugin')
import { Request, Response } from 'express';


const logger = buildLogger('rate.controller.js')

async function newRate(req: Request, res:Response): Promise<Response>  {
  try {
    const newRate = new Rate(req.body);
    const createdRate = await newRate.save();
    return res.status(201).json(createdRate);
  } catch (error) {
    logger.error(`Error al crear la tarifa: ${error}`);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
  }


async function getActiveRates(req: Request, res: Response): Promise<Response> {
  try {
    const allRates = await Rate.find({
      endDate: maxDate
    })
    return res.status(200).json(allRates);
  } catch (error) {
    return res.status(500).json(error);
  }  
}       



 async function updateRates(req: Request, res: Response): Promise<Response> {
  const {rates} = req.body  

  console.log('rates ', rates);
  

  for (const rate of rates) {

    const filter = { rate: rate.name };
    const update = { price: rate.price };

    try {
      
      let rateUpdated = await Rate.findOneAndUpdate(filter, update);  
      
          
    } catch (error) {
      return res.status(500).json({'error': `error al actualizar las tarifas ${error}`});
    }
  }

  return res.status(200).json({'message': 'Tarifa(s) actualizadas correctamente'});
  
 }






module.exports = {newRate, getActiveRates, updateRates}