const Rate = require ('../models/rates.model')
const maxDate = new Date('9999-12-31T23:59:59.999Z');

// Modelo 
//    rate  > String. 
//    price > Number
//    endDate > Date


// - newRate   => Crea una nueva tarifa. | url /rates/new-rate | 
// - getRates  => Obtiene las tarifas actuales. La tarifa actual tiene fecha (endDate) = '9999-12-31'
// - updateRates => Actualiza el importe de la tarifa indicada. 


const newRate = async (req, res) => {   
  
    try {
      const newRate = new Rate(req.body);  
      const createdRate = await newRate.save();
      return res.status(201).json(createdRate);   
  
    } catch (error) {
      console.log('Se ha podrucido un error en el alta de la tarifa ');
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

const updateRate = () => {

}

module.exports = {newRate, getActiveRates}