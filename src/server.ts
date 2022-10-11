import dotenv from 'dotenv';
import { V1Router,V2Router } from './routes';
import App from './app/App';
import RouteHandler from './app/Route';
import MongooseService from './libs/db/MongooseService'
import { loadModels } from './model/Models';

dotenv.config();

let port = process.env.PORT;
let connectionUrl = process.env.DB_CONNECTION_URL

let mongooseService:MongooseService = MongooseService.getServiceInstance(<string> <unknown>connectionUrl);
loadModels(mongooseService.connection);

var app:App = App.getInstance(<number> <unknown>port);

app.attachRouters([
    new RouteHandler('/api/v1', V1Router),
    new RouteHandler('/api/v2', V2Router)
]).start(() => {
    console.log("Finally Server started ...");
});