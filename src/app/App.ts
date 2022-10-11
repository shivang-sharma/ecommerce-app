import express, {} from 'express';
import bodyParser from 'body-parser';
import Middleware from './Middleware';
import RouteHandler from './Route';
import cors from 'cors';

class App {
  private static _instance:App;
  private _app: express.Application;
  private _port: number;
  private _customMiddlewares: Middleware[] = [];
  private _routers:RouteHandler[] = []

  private constructor(port:number) {
    this._app = express();
    this._port = port;
    this._app.set('port', this._port);
    this.attachDefaultMiddlewares()
  }
 
  private attachDefaultMiddlewares() {
    this._app.use(bodyParser.json());
    this._app.use(express.urlencoded({ extended: true }))
    this._app.use(express.json());
    this._app.use(cors());
  }

  public attachCustomMiddlewares(customMiddlewares:Middleware[]) {
    this._customMiddlewares.concat(customMiddlewares);
    this._customMiddlewares.forEach((middleware:Middleware) => {
      this._app.use(middleware.middleware);
      console.log(`Successfully attached middleware ${middleware.name}`);
    });
    return this;
  }
  public attachRouters(routers:RouteHandler[]) {
    this._routers = routers;
    this._routers.forEach((router:RouteHandler) => {
      this._app.use(router.route, router.router);
      console.log(`Successfully attached router for ${router.route}`);
    });
    return this;
  }
 
  public start(callback:Function) {
    this._app.listen(this._port, () => {
      console.log(`App listening on the port ${this._port}`);
      console.log(`http://localhost:${this._port}`);
      callback();
    });
  }
  public get app() {
    return this._app;
  }
  public static getInstance(port:number):App {
    if (App._instance) {
      return App._instance;
    }
    App._instance = new App(port);
    return App._instance;
  }
}
 
export default App;