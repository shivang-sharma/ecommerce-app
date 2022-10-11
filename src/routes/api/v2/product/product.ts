import { Router, Request, Response, NextFunction } from "express";

var apiV2ProductRoutes = Router();

apiV2ProductRoutes.all('/', function (req:Request, res:Response, next:NextFunction) {
    next();
});
apiV2ProductRoutes.get('/', function (req:Request, res:Response, next:NextFunction) {
    res.send('Hey Get');
    next();
});

export {apiV2ProductRoutes as APIV2ProductRouter};