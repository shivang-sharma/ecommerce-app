import { Router } from "express";
import { APIV1ProductRouter } from "./api/v1/product/product";
import { APIV1UsersRouter } from "./api/v1/user/user";
import { APIV2ProductRouter } from "./api/v2/product/product";


var v1Router = Router();
var v2Router = Router();

v1Router.use('/user', APIV1UsersRouter);

v1Router.use('/product', APIV1ProductRouter);
v2Router.use('/product', APIV2ProductRouter);

export {v1Router as V1Router};
export {v2Router as V2Router};