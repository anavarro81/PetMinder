import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const sitsSchema = new Schema(
    {
        startDate: 
        {   type: Date
            
        },

        endDate: 
        {   type: Date
            
        },

        serviceDate: {
            type: Date
        },


        service: { 
            type: String, 
            required: true,
            enum: ['paseo', 'alojamiento'] 
        },

        rateType: {
            type: String,
            required: true,
            enum: ['festivo', 'laborable']
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
