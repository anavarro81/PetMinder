import { log } from "winston";


import Holidays from 'date-holidays';

// Obtiene la configuracion de fechas festivas para España ('ES')y Madrid ('MD')
const hd = new Holidays('ES', 'MD');


const Rate = require ('../models/rates.model')


// Devuelve si una fecha es festivo en Madrid o si es fin de semana. 
function isHolidayOrWeekend (date: Date): boolean {

    const holiday = hd.isHoliday(date)
    const isWeekend = date.getDay() === 0 || date.getDay() === 6
    
    // La doble exclamacion convierte a valor booleano el retorno de isHoliday
    return !!holiday || isWeekend

}


export async function calculateRateTable(startDate: Date, endDate: Date): Promise<any> {   
  
    
    //TODO: Descomentar    
    let initialDate = new Date (startDate)
    let finalDate = new Date (endDate)

    const sitPeriod = []    

    while (initialDate <= finalDate) {        
        // Se crea nueva estancia de incial Date para crear una copia de la fecha. Si no se modificaria siempre. 
        sitPeriod.push(new Date(initialDate))
        initialDate.setDate(initialDate.getDate() + 1)               
    }

    //FIXME: 
    // Consulto las tarifas de alojamiento

    const filter = { rate: { $regex: '^alojamiento', $options: 'i' } }

    const accomodationFees = await Rate.find(filter)

    console.log('accomodationFees > ', accomodationFees);


    // Recupera las tarifas para dia festivo y laborable. 
    const HolidayPrice = accomodationFees.find ((fee: { rate: string; }) => fee.rate == 'alojamiento festivo')?.price
    const weekDayRate = accomodationFees.find ((fee: { rate: string; }) => fee.rate == 'alojamiento laborable')?.price

    console.log('HolidayPrice > ', HolidayPrice);
    console.log('weekDayRate > ', weekDayRate);



    const ratesTable = []

    for (const date of sitPeriod) {

        isHolidayOrWeekend(date)

        if (isHolidayOrWeekend(date)) {        
            ratesTable.push({date: date, price: HolidayPrice})                        
        } else {
            ratesTable.push({date: date, price: weekDayRate})
        }
        
    }

    console.log('ratesTable ', ratesTable);
    return [ratesTable]

    
}



export async function calculateRate(service: string, rateType: string ): Promise<number> {   
    

    try {           
            const rate = service + ' ' + rateType      
            const filter = { rate: rate };
    
            const filteredRate = await Rate.findOne(filter)    
    
            if(!filteredRate) {
                console.log('Error al recuperar la tarifa...');    
                return -1
            }        
    
            return filteredRate.price
        
    } catch (error) {
        console.log('Error en la consulta de la tarifa: ');
        console.log(error)
        return -1
    }
    
    


}




