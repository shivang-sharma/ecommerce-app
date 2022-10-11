import { Schema } from "mongoose";
import { IProduct } from "../model/IProduct";

const productSchema = new Schema<IProduct>({
    id: {type: Number, required:true},
    title: {type: String, required:true},
    price: {type: Number, required: true},
    description: {type: String},
    image: {type: String},
    category: {type: String}
});

export { productSchema }