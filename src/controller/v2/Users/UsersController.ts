import { Request, Response, NextFunction } from "express";

function getAllUser(req:Request, res:Response, next:NextFunction) {
    res.send("GetAllUser");
    res.end();
}
function getUser(req:Request, res:Response, next:NextFunction) {
    res.send("GetUser");
    res.end();
}
function addUser(req:Request, res:Response, next:NextFunction) {
    res.send("AddUser");
    res.end();
}
function editUser(req:Request, res:Response, next:NextFunction) {
    res.send("EditUser");
    res.end();
}
function deleteUser(req:Request, res:Response, next:NextFunction) {
    res.send("DeleteUser");
    res.end();
}

export {getAllUser, getUser, addUser, editUser, deleteUser}