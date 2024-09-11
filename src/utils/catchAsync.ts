import { NextFunction } from "express";

module.exports = (fn: Function) => {

    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch((error:any) => {
            next(error)
        })     }
} 
    

 