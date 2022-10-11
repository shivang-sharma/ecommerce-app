import { createConnection, Connection } from 'mongoose';

class MongooseService {
    private readonly _connectionUrl:string = ''
    private static _mongooseServiceInstance:MongooseService;
    private _connection!: Connection;
    private constructor (connectionUrl:string) {
        this._connectionUrl = connectionUrl;
        try {
            this._connection = this.connect(this._connectionUrl)
        } catch(error) {
            console.log(error)
        }
    }
    private connect(connectionUrl:string):Connection {
        return createConnection(connectionUrl);
    }
    public get connection():Connection {
        return this._connection;
    }
    public static getServiceInstance(connetionUrl:string):MongooseService {
        if (MongooseService._mongooseServiceInstance) {
            return MongooseService._mongooseServiceInstance;
        }
        MongooseService._mongooseServiceInstance = new MongooseService(connetionUrl);
        return MongooseService._mongooseServiceInstance;
    }
}

export default MongooseService