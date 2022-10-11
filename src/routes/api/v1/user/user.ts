import { Router, Request, Response, NextFunction } from "express";
import { getAllUser, getUser, addUser, editUser, deleteUser } from "../../../../controller/v1/Users/UsersController"

let apiV1UsersRoutes = Router();

apiV1UsersRoutes.all('/', function (req:Request, res:Response, next:NextFunction) {
    next();
});

apiV1UsersRoutes.get('/', getAllUser);
apiV1UsersRoutes.get('/:id', getUser);
apiV1UsersRoutes.post('/',addUser);
apiV1UsersRoutes.put('/:id',editUser);
apiV1UsersRoutes.patch('/:id',editUser);
apiV1UsersRoutes.delete('/:id',deleteUser);

export {apiV1UsersRoutes as APIV1UsersRouter};