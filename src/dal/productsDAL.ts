import { Product } from "../model/Models";

function getAllProductsDAL(limitCount:number, sorted:boolean) {
    const limit = limitCount;
    const sort = sorted? -1:1;
    return new Promise((resolve, reject) => {
        Product.find()
        .select(['-_id'])
        .limit(limit)
        .sort({id:sort})
        .exec((error, products) => {
            if (error) {
                console.log(error);
                reject(error);
            }
            console.log(products);
            resolve(products);
            return products;
        });
    });
}

function getProductDAL(id:number) {
    return new Promise((resolve, reject) => {
        Product.findOne({id})
        .exec((error, product) => {
            if (error) {
                console.log(error);
                reject(error);
            }
            console.log(product);
            resolve(product);
            return product;
        });
    });
}
async function addProductDAL(title:string, price:number, description:string,
    image:string, category:string) {
    let newProductId!:number;
    function generateId() {
        return new Promise((resolve, reject) => {
            Product.countDocuments((error, count) => {
                if (error) {
                    console.log(error);
                    reject(error);
                }
                console.log(count);
                resolve(count);
                newProductId = ++count;
            });
        });
    }
    await generateId();
    const newProduct = new Product({
        id:newProductId,
        title:title,
        price:price,
        description:description,
        image:image,
        category:category
    });
    return new Promise((resolve, reject) => {
        newProduct.save().then((product) => {
            console.log(product);
            resolve(product);
            return product;
        }).catch((error) => {
            console.log(error);
            reject(error);
        });
    });
}

function editProductDAL(id:string, title:string, price:number, description:string,
    image:string, category:string, method:string) {
        const product = {
            id:id,
            title:title,
            price:price,
            description:description,
            image:image,
            category:category
        }
        return new Promise((resolve, reject) => {
            if (method === "PUT") {
                console.log(method);
                Product.findOneAndReplace({id:id}, product)
                .exec((error, product) => {
                    if (error) {
                        console.log(error);
                        reject(error);
                    }
                    console.log("BEFORE UPDATE : ", product);
                    Product.findOne({id:id})
                    .exec((error, updatedProduct) => {
                        if (error) {
                            console.log(error);
                            reject(error);
                        }
                        console.log("AFTER UPDATE : ", updatedProduct);
                        resolve(updatedProduct);
                        return updatedProduct;
                    });
                });
            } else {
                Product.findOneAndUpdate({id:id}, product)
                .exec((error, product) => {
                    if (error) {
                        console.log(error);
                        reject(error);
                    }
                    console.log("BEFORE UPDATE : ", product);
                    Product.findOne({id:id})
                    .exec((error, updatedProduct) => {
                        if (error) {
                            console.log(error);
                            reject(error);
                        }
                        console.log("AFTER UPDATE : ", updatedProduct);
                        resolve(updatedProduct);
                        return updatedProduct;
                    });
                });
            }
        });
}
function getProductCategoriesDAL(sorted:boolean) {
    const sort = sorted ? -1 :1;
    return new Promise((resolve, reject) => {
        Product.distinct('category')
        .sort({category:sort})
        .exec((error, categories) => {
            if (error) {
                console.log(error);
                reject(error);
            }
            console.log(categories);
            resolve(categories);
            return categories;
        });
    });
}
function getProductsInCategoryDAL(limit:number, sorted:boolean, category:string) {
    const sort = sorted ? -1 : 1;
    return new Promise((resolve, reject) => {
        Product.find({category})
        .select(['-_id'])
        .sort({id:sort})
        .limit(limit)
        .exec((error, products) => {
            if (error) {
                console.log(error);
                reject(error);
            }
            console.log(products);
            resolve(products);
            return products;
        });
    });
}
function deleteProductDAL(id:string) {
    return new Promise((resolve, reject) => {
        Product.findOneAndDelete({id:id})
        .exec((error, product) => {
            if (error) {
                console.log(error);
                reject(error);
            }
            console.log(product);
            resolve(product);
            return product;
        });
    });
}
export {getAllProductsDAL, getProductDAL, addProductDAL, editProductDAL, getProductCategoriesDAL, getProductsInCategoryDAL, deleteProductDAL}