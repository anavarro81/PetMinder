import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const maxDate = new Date('9999-12-31T23:59:59.999Z');

const ratesSchema = new Schema(
    {
      rate: { type: String, 
            required: true, 
            enum: ['paseo laborable', 'paseo festivo', 'alojamiento laborable', 'alojamiento festivo'],
            unique: true
        },
      price: { 
        type: Number, 
        required: true,
        min: 1 
    },
    
    },   
    {
        timestamps: true,
      }
  );

  
  const rate = mongoose.model("Rates", ratesSchema);
  
  module.exports = rate;


