interface IUser {
    id:number;
    email: string;
    username:string;
    password:string;
    name: {
        firstname:string;
        lastname:string;
    };
    address: {
        city:string;
        street:string;
        number:number;
        zipcode:number;
        geolocation: {
            lat:string;
            long:string;
        };
    };
    phone:string;
}

export {IUser}