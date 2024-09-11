// import { NextFunction } from "express";

// const sendErrorDev = (error: , resp: Response): Response => {

//     return resp.status(error.statusCode).json({'status' : error?.status, 'error': error, 'message ': error.message, 'stack': error.stack}  )
// }

// module.exports = (error: any, req: Request, res: Response, next: NextFunction) => {

    
//     error.statusCode = error.statusCode || 500

//     error.status = error.status || 'error' 


    
//     if (process.env.NODE_ENV == 'development') {

//         sendErrorDev(error, res)
        
//     } else if (process.env.NODE_ENV == 'production'){
        
        
        
//     }

// } 