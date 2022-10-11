import { Schema } from "mongoose";
import { IUser } from "../model/IUser";

const userSchema = new Schema<IUser>({
    id: {type:Number, required:true},
    email: { type: String, required: true },
    username: {type:String, required: true},
    password: {type:String, required: true},
    name: {
        firstname: {
            type:String,
            required:true
        },
        lastname:{
            type:String,
            required: true
        }
    },
    address: {
        city:String,
        street:String,
        number:Number,
        zipcode:Number,
        geolocation: {
            lat:String,
            long:String,
        },
    },
    phone:String
});

export { userSchema }