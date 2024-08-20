import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const maxDate = new Date('9999-12-31T23:59:59.999Z');

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
        default: maxDate
    }
    
    },   
    {
        timestamps: true,
      }
  );

  
  const rate = mongoose.model("Rates", ratesSchema);
  
  module.exports = rate;


