# DOG TRACKER API project

## Rates Model

| Name    | Type    | Required | Validations                      |
|---------|-------- |----------|----------------------------------|
| rate    | String  | Yes      | enum: 'Paseo laborable',         |
|         |         |          |      'Paseo festivo',            |
|         |         |          |      'Alojamiento laborable',    |
|         |         |          |      'Alojamiento festivo'       |   
| price   | Numbrer | Yes      | min: 1                           |   
| endDate | Date    | Yes      | default: maxDate                 |



### Rates endpoints

#### Crea una nueva tarifa. 
PUT http://localhost:5000/rates/new-rate   

REQUEST
```json
{
	"rate": "Alojamiento festivo",
    "price": 20,
    "endDate": "2024-08-14"
}
```

Nota: Si no se informa el campo: endDate se informa por defecto con: 9999-12-31 (maxDate)

RESPONSE
```json
{
    "rate": "Alojamiento festivo",
    "price": 20,
    "endDate": "2024-08-14T00:00:00.000Z",
    "_id": "66bcfd7ef667fb6e32134647",
    "createdAt": "2024-08-14T18:54:54.726Z",
    "updatedAt": "2024-08-14T18:54:54.726Z",
    "__v": 0
}
```

### updateRates
Actualiza las tarifas. Puede recibir una o varias tarifas en un array. 

PUT http://localhost:5000/rates//update-rates

REQUEST
```json
{
    "rates": [
      {
        "name": "Paseo laborable",
        "price": 25
      },
      {
        "name": "Paseo festivo",
        "price": 17
      },
      {
        "name": "Alojamiento laborable",
        "price": 23
      },
            {
        "name": "Alojamiento festivo",
        "price": 25
      }

    ]
}
```
RESPONSE
```json
{
    "message": "Tarifa(s) actualizadas correctamente"
}
```


## Sits Model

| Name           | Type     | Required | Description                                   |
|---------       |--------  |----------|-----------------------------------------------|
| serviceDate    | Date     | Yes      | Fecha en que se realiza el servicio           |
| service        | String   | Yes      | Nombre del servicio: 'Paseo' o 'Alojamiento'  |  
| rateType       | String   | Yes      | Tarifa del servicio: 'Laborable' o 'Festivo'  |
| petName        | String   | Yes      | Nombre de la mascota                          |
| provided       | Boolean  | Yes      | Indica si el servicio se realizó o no         |
| finalPrice     | Number   | Yes      | Indica lo cobrado por el servicio             | 
|--------------------------------------------------------------------------------------|









