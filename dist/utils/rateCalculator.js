"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateRateTable = calculateRateTable;
exports.calculateRate = calculateRate;
const date_holidays_1 = __importDefault(require("date-holidays"));
// Obtiene la configuracion de fechas festivas para España ('ES')y Madrid ('MD')
const hd = new date_holidays_1.default('ES', 'MD');
const Rate = require('../models/rates.model');
// Devuelve si una fecha es festivo en Madrid o si es fin de semana. 
function isHolidayOrWeekend(date) {
    const holiday = hd.isHoliday(date);
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    // La doble exclamacion convierte a valor booleano el retorno de isHoliday
    return !!holiday || isWeekend;
}
function calculateRateTable(startDate, endDate, starHour, endHour) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const sitPeriod = [];
        let initialDate = new Date(startDate);
        let finalDate = new Date(endDate);
        while (initialDate <= finalDate) {
            // Se crea nueva estancia de incial Date para crear una copia de la fecha. Si no se modificaria siempre. 
            sitPeriod.push(new Date(initialDate));
            initialDate.setDate(initialDate.getDate() + 1);
        }
        // Se agrega la hora de recogida y entrega al primer y último regi
        sitPeriod[0] = new Date(`${startDate}T${starHour}Z`);
        sitPeriod[sitPeriod.length - 1] = new Date(`${endDate}T${endHour}Z`);
        console.log('sitPeriod >> ', sitPeriod);
        //FIXME: 
        // Consulto las tarifas de alojamiento
        const filter = { rate: { $regex: '^alojamiento', $options: 'i' } };
        const accomodationFees = yield Rate.find(filter);
        console.log('accomodationFees > ', accomodationFees);
        // Recupera las tarifas para dia festivo y laborable. 
        const holidayPrice = parseInt((_a = accomodationFees.find((fee) => fee.rate == 'alojamiento festivo')) === null || _a === void 0 ? void 0 : _a.price);
        const weekDayRate = parseInt((_b = accomodationFees.find((fee) => fee.rate == 'alojamiento laborable')) === null || _b === void 0 ? void 0 : _b.price);
        const ratesTable = sitPeriod.map(date => {
            const isHoliday = isHolidayOrWeekend(date);
            return {
                date,
                rate: isHoliday ? 'festivo' : 'laborable',
                price: isHoliday ? holidayPrice : weekDayRate,
            };
        });
        return ratesTable;
    });
}
function calculateRate(service, rateType) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const rate = service + ' ' + rateType;
            const filter = { rate: rate };
            const filteredRate = yield Rate.findOne(filter);
            if (!filteredRate) {
                console.log('Error al recuperar la tarifa...');
                return -1;
            }
            return filteredRate.price;
        }
        catch (error) {
            console.log('Error en la consulta de la tarifa: ');
            console.log(error);
            return -1;
        }
    });
}
