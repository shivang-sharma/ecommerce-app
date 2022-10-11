import { Request, Response, NextFunction } from "express";
import { getAllUserDAL, getUserDAL, addUserDAL, editUserDAL, deleteUserDAL } from "../../../dal/usersDAL";

async function getAllUser(req:Request, res:Response, next:NextFunction) {
    let limit = (() => {
        if (Number(req.query.limit)) {
            return Number(req.query.limit)
        }
        return 0;
    })
    let sort = req.query.sort === 'desc'
    const users = await getAllUserDAL(limit(), sort);
    res.json(users);
    res.end();
}
async function getUser(req:Request, res:Response, next:NextFunction) {
    const id = Number(req.params.id);
    const user = await getUserDAL(id);
    res.json(user);
    res.end();
}
async function addUser(req:Request, res:Response, next:NextFunction) {
    if (typeof req.body === undefined) {
		res.json({
			status: 'error',
			message: 'data is undefined',
		});
	} else {
        let email:string = req.body.email;
        let username:string = req.body.username;
        let password:string = req.body.password;
        let firstname:string = req.body.firstname;
        let lastname:string = req.body.lastname;
        let city:string = req.body.city;
        let street:string = req.body.street;
        let number:number = req.body.number;
        let zipcode:number = req.body.zipcode;
        let lat:string = req.body.lat;
        let long:string = req.body.long;
        let phone:string = req.body.phone;
        let user = await addUserDAL(email, username, password, firstname, lastname, city,
            street, number, zipcode, lat, long, phone);
        console.log(user);
        res.json(user);
    };
    res.end();
}
async function editUser(req:Request, res:Response, next:NextFunction) {
    if (typeof req.body === undefined || req.params.id === null) {
		res.json({
			status: 'error',
			message: 'something went wrong! check your sent data',
		});
	} else {
        let id:number = Number(req.params.id);
        let email:string = req.body.email;
        let username:string = req.body.username;
        let password:string = req.body.password;
        let firstname:string = req.body.firstname;
        let lastname:string = req.body.lastname;
        let city:string = req.body.city;
        let street:string = req.body.street;
        let number:number = req.body.number;
        let zipcode:number = req.body.zipcode;
        let lat:string = req.body.lat;
        let long:string = req.body.long;
        let phone:string = req.body.phone;
        let updatedUser = await editUserDAL(id, email, username, password, firstname, lastname, city,
            street, number, zipcode, lat, long, phone, req.method);
        res.status(200).json(updatedUser);
    }
    res.end();
}
async function deleteUser(req:Request, res:Response, next:NextFunction) {
    let id:number = Number(req.params.id);
    if (id === null) {
		res.json({
			status: 'error',
			message: 'user id should be provided',
		});
	} else {
       let response  = await deleteUserDAL(id);
       res.json(response);
    }
    res.end();
}

export {getAllUser, getUser, addUser, editUser, deleteUser}