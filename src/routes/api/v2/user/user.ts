import { Router, Request, Response, NextFunction } from "express";
import { getAllUser, getUser, addUser, editUser, deleteUser } from "../../../../controller/v2/Users/UsersController"

let apiV2UsersRoutes = Router();

apiV2UsersRoutes.all('/', function (req:Request, res:Response, next:NextFunction) {
    next();
});

apiV2UsersRoutes.get('/', getAllUser);
apiV2UsersRoutes.get('/:id', getUser);
apiV2UsersRoutes.post('/',addUser);
apiV2UsersRoutes.put('/:id',editUser);
apiV2UsersRoutes.patch('/:id',editUser);
apiV2UsersRoutes.delete('/:id',deleteUser);

export {apiV2UsersRoutes as APIV2UsersRouter};