import { Request, Response, NextFunction } from "express";
import { getAllProductsDAL, getProductDAL, addProductDAL, editProductDAL, getProductCategoriesDAL, getProductsInCategoryDAL, deleteProductDAL } from "../../../dal/productsDAL";

async function getAllProducts(req:Request, res:Response, next:NextFunction) {
    try{
        const limit = () => {
            if (Number(req.query.limit)) {
                return Number(req.query.limit);
            }
            return 0;
        }
        let sort = req.query.sort === 'desc';
        const products = await getAllProductsDAL(limit(), sort);
        console.log(products);
        res.status(200).json(products);
    } catch(error) {
        console.log(error);
        res.status(500).write("Some error has occurred.");
    } finally {
        res.end();
    }
}
async function getProduct(req:Request, res:Response, next:NextFunction) {
    try{
        const id = () => {
            if(Number(req.params.id)) {
                return Number(req.params.id);
            }
            throw new Error("Invalid Parameter");
        }
        const product = await getProductDAL(id());
        console.log(product);
        res.status(200).json(product);
    }catch(error) {
        console.log(error);
        res.status(500).write("Some error occured");
    } finally {
        res.end();
    }
}
async function addProduct(req:Request, res:Response, next:NextFunction) {
    try {
        if (typeof req.body === undefined) {
            res.json({
                status: 'error',
                message: 'data is undefined',
            });
        } else {
            let title:string = req.body.title;
            let price:number = req.body.price;
            let description:string = req.body.description;
            let image:string = req.body.image;
            let category:string = req.body.category;
            let product = await addProductDAL(title, price, description, image, category);
            res.status(200).json(product);
        }
    } catch(error) {
        console.log(error);
        res.status(500).write("Some Error occured");
    } finally {
        res.end();
    }
}
async function editProduct(req:Request, res:Response, next:NextFunction) {
    try {
        if (typeof req.body === undefined || req.params.id === null) {
            res.json({
                status: 'error',
                message: 'data is undefined',
            });
        } else {
            let id:string = req.params.id;
            let title:string = req.body.title;
            let price:number = req.body.price;
            let description:string = req.body.description;
            let image:string = req.body.image;
            let category:string = req.body.category;
            let updatedProduct = await editProductDAL(id, title, price, description, image, category, req.method);
            res.status(200).json(updatedProduct);
        }
    } catch(error) {
        console.log(error);
        res.status(500).write("Some Error occured");
    } finally {
        res.end();
    }
}
async function getProductCategories(req:Request, res:Response, next:NextFunction) {
    try{
        let sort = req.query.sort === 'desc';
        const categories = await getProductCategoriesDAL(sort);
        console.log(categories);
        res.status(200).json(categories);
    } catch(error) {
        console.log(error);
        res.status(500).write("Some error occured");
    } finally {
        res.end();
    }
}
async function getProductsInCategory(req:Request, res:Response, next:NextFunction) {
    try {
        const limit = () => {
            if (Number(req.query.limit)) {
                return Number(req.query.limit);
            }
            return 0;
        }
        let sort = req.query.sort === 'desc';
        let category = req.params.category;
        const products = await getProductsInCategoryDAL(limit(), sort, category);
        console.log(products);
        res.status(200).json(products);
    } catch(error) {
        console.log(error);
        res.status(500).write("Some error occured");
    } finally {
        res.end();
    }
}
async function deleteProduct(req:Request, res:Response, next:NextFunction) {
    try {
        let id:string = req.params.id;
        const product = await deleteProductDAL(id);
        console.log(product);
        res.status(200).json(product);
    } catch(error) {
        console.log(error);
        res.status(500).write("Some error occured");
    } finally {
        res.end();
    }
}
 export { getAllProducts, getProductCategories, getProductsInCategory, getProduct, addProduct, editProduct, deleteProduct }