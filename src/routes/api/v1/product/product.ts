import { Router, Request, Response, NextFunction } from "express";
import { getAllProducts, getProductCategories, getProductsInCategory, getProduct, addProduct, editProduct, deleteProduct } from '../../../../controller/v1/Products/ProductsController';

let apiV1ProductRoutes = Router();


apiV1ProductRoutes.all('/', function (req:Request, res:Response, next:NextFunction) {
    next();
});

apiV1ProductRoutes.get('/', );
apiV1ProductRoutes.get("/", getAllProducts);
apiV1ProductRoutes.get("/categories", getProductCategories);
apiV1ProductRoutes.get("/category/:category", getProductsInCategory);
apiV1ProductRoutes.get("/:id", getProduct);
apiV1ProductRoutes.post("/", addProduct);
apiV1ProductRoutes.put("/:id", editProduct);
apiV1ProductRoutes.patch("/:id", editProduct);
apiV1ProductRoutes.delete("/:id", deleteProduct);

export {apiV1ProductRoutes as APIV1ProductRouter};