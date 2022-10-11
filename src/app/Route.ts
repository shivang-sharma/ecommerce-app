import { Router } from "express";

class RouteHandler {
    private _route:string;
    private _router:Router;
    
    constructor(route:string, router:Router) {
        this._route = route;
        this._router = router;
    }
    
    public get route() : string {
        return this._route;
    }

    public get router() : Router {
        return this._router
    }      
}

export default RouteHandler