import { User } from "../model/Models";

function getAllUserDAL(limitCount:number, sorted:boolean) {
    const limit = limitCount;
	const sort = sorted ? -1 : 1;
    return new Promise((resolve, reject) => {
        User.find()
		.select(['-_id'])
		.limit(limit)
		.sort({ id: sort,})
        .exec((error, users) => {
            if(error) {
                console.log(error);
                reject(error);
            }
            console.log(users);
            resolve(users);
            return users;
        });
    });
}

function getUserDAL(id:number,) {
    return new Promise((resolve, reject) => {
        User.findOne({id,})
        .select(['-_id'])
        .exec((error, user) => {
            if(error) {
                console.log(error);
                reject(error);
            }
            console.log(user);
            resolve(user);
            return user;
        })
    });
}

async function addUserDAL(
    email:string, username:string, password:string,
    firstname:string, lastname:string, city:string,
    street:string, number:number, zipcode:number,
    lat:string, long:string, phone:string) {
        let newUserId!:number;
        function generateId() {
            return new Promise((resolve, reject) => {
                User.countDocuments((err, count) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    newUserId = ++count;
                    resolve(newUserId);
                });
            });
        }
        await generateId();
        const newUser = new User({
            id: newUserId,
            email:email,
            username:username,
            password:password,
            name:{
                firstname:firstname,
                lastname:lastname
            },
            address: {
                city:city,
                street:street,
                number:number,
                zipcode:zipcode,
                geolocation:{
                    lat:lat,
                    long:long
                },
            },
            phone:phone
        });
        return new Promise((resolve, reject) => {
            newUser.save().then((user)=>{
                resolve(user);
                return user;
            }).catch((err)=>{
                reject(err);
                console.log(err);
            });
        });
}

function editUserDAL(
    id:number, email:string, username:string, password:string,
    firstname:string, lastname:string, city:string,
    street:string, number:number, zipcode:number,
    lat:string, long:string, phone:string, method:string) {
        const editedUser = {
            id: id,
            email:email,
            username:username,
            password:password,
            name:{
                firstname:firstname,
                lastname:lastname
            },
            address: {
                city:city,
                street:street,
                number:number,
                zipcode:zipcode,
                geolocation:{
                    lat:lat,
                    long:long
                },
            },
            phone:phone
        };
        return new Promise((resolve, reject) => {
            if (method === "PUT") {
                console.log("PUT")
                User.findOneAndReplace({id:id}, editedUser)
                .exec((error, user) => {
                    if (error) {
                        console.log(error);
                        reject(error);
                    }
                    console.log("ORIGINAL USER : ", user);
                    User.findOne({id:id})
                    .exec((error, updatedUser) => {
                        if (error) {
                            console.log(error);
                            reject(error);
                        }
                        resolve(updatedUser);
                        console.log("UPDATED USER : ", updatedUser);
                        return updatedUser;
                    });
                });   
            } else {
                User.findOneAndUpdate({id:id}, editedUser)
                .exec((error, user) => {
                    if (error) {
                        console.log(error);
                        reject(error);
                    }
                    console.log("ORIGINAL USER : ", user);
                    User.findOne({id:id})
                    .exec((error, updatedUser) => {
                        if (error) {
                            console.log(error);
                            reject(error);
                        }
                        resolve(updatedUser);
                        console.log("UPDATED USER : ", updatedUser);
                        return updatedUser;
                    });
                });
            }
        });
}

function deleteUserDAL(id:number) {
    return new Promise((resolve, reject) => {
        User.findOneAndDelete({id: id})
        .exec((error, user) => {
            if (error) {
                console.log(error);
                reject(error);
            }
            console.log(user);
            resolve(user);
            return user;
        });
    });
}
export {getAllUserDAL, getUserDAL, addUserDAL, editUserDAL, deleteUserDAL}