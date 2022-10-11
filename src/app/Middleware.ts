class Middleware {
    private _name:String;
    private _middleware:any;

    constructor(name:String, middleware:any) {
        this._name = name;
        this._middleware = middleware
    }

    public get name() : String {
        return this._name;
    }
    public get middleware() : any {
        return this._middleware;
    }   
}

export default Middleware