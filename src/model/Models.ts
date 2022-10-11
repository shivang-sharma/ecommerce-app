import { Connection, Model } from "mongoose";
import { userSchema } from "../schemas/UserSchema";
import { IUser } from "./IUser";
import { IProduct } from "./IProduct";
import { productSchema } from "../schemas/ProductSchema";

let User:Model<IUser>;
let Product:Model<IProduct>;

function loadModels(connection:Connection) {
    User = connection.model<IUser>('User', userSchema);
    Product = connection.model<IProduct>('Product', productSchema);
}

export {User, Product, loadModels}
