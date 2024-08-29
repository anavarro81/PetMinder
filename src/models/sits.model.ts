import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const sitsSchema = new Schema(
    {
        startDate: 
        {   type: Date, 
            required: true,                         
        },

        endDate: 
        {   type: Date, 
            required: true,                         
        },


        service: { 
            type: String, 
            required: true,
            enum: ['Paseo', 'Alojamiento'] 
        },

        rateType: {
            type: String,
            required: true,
            enum: ['Festivo', 'Laborable']
        },

        petName: {
            type: String,
            required: true,            
        },

        provided: {
            type: Boolean,
            require: true,
            default: 'false'
        },

        finalPrice: {
            type: Number, 
            require: true,

        }

    
    },   
    {
        timestamps: true,
      }
  );

  
  const sit = mongoose.model("Sits", sitsSchema);
  
  module.exports = sit;
