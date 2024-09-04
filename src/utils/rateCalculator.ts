

const Rate = require ('../models/rates.model')

// Si es paseo consulto la tarifa




//TODO 
export async function calculateRate(service: string, rateType: string): Promise<number> {

    
    console.log('Estoy en calculateRate');
    console.log('service: ', service);
    console.log('rateType: ', rateType);
    

    try {
    
        if (service === 'paseo') {

            const rate = service + ' ' + rateType
    
            console.log('rate: ', rate);
            
    
            const filter = { rate: rate };
    
            const filteredRate = await Rate.findOne(filter)
    
            console.log('filteredRate ', filteredRate);
            console.log('price ', filteredRate.price);
    
            if(!filteredRate) {
                console.log('Error al recuperar la tarifa...');    
                return -1
            }        
    
            return filteredRate.price
        
        }  else if (service === 'alojamiento') {
    
            return 99
    
        } else {
             console.log('Tarifa no encontrada...');             
             return -1
        }
    
        
    } catch (error) {
        console.log('Error en la consulta de la tarifa: ');
        console.log(error)
        return -1
    }
    
    


}




