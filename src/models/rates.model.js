const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratesSchema = new Schema(
    {
      rate: { type: String, 
            required: true, 
            enum: ['Paseo laborable', 'Paseo festivo', 'Alojamiento laborable', 'Alojamiento festivo'] 
        },
      price: { 
        type: Number, 
        required: true,
        min: 1 
    },
    endDate: {
        type: Date,
        default: function () {
        return new Date(9999, 11, 31); 
        },
    }
    
    },   
    {
        timestamps: true,
      }
  );

  
  const rate = mongoose.model("Rates", ratesSchema);
  
  module.exports = rate;


