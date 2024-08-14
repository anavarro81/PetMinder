const Rate = require ('../models/rates.model')



const newRate = async (req, res) => {   

    console.log('newRate');
    
  
    try {
      const newRate = new Rate(req.body);  
      const createdRate = await newRate.save();
      return res.status(201).json(createdRate);   
  
    } catch (error) {
      console.log('Se ha podrucido un error en el alta de la tarifa ');
      return res.status(500).json(error);
    } 
  }

module.exports = {newRate}