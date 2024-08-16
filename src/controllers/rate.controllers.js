const Rate = require ('../models/rates.model')
const maxDate = new Date('9999-12-31T23:59:59.999Z');
const buildLogger = require('../plugins/logger.plugin')

// Modelo 
//    rate  > String. 
//    price > Number
//    endDate > Date


// - newRate   => Crea una nueva tarifa. | url /rates/new-rate | 
// - getRates  => Obtiene las tarifas actuales. La tarifa actual tiene fecha (endDate) = '9999-12-31'
// - updateRates => Actualiza el importe de la tarifa indicada. 

const logger = buildLogger('rate.controller.js')

const newRate = async (req, res) => {   
  
    try {
      const newRate = new Rate(req.body);        
      const createdRate = await newRate.save();
      return res.status(201).json(createdRate);   
  
    } catch (error) {
      logger.error(`Error al crear la tarifa: ${error}`)
      return res.status(500).json(error);
    } 
  }

const getActiveRates = async (req, res) => {
  try {
    const allRates = await Rate.find({
      endDate: maxDate
    })
    return res.status(200).json(allRates);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateRates = async (req, res) => {

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