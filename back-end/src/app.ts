import express from "express";
import cors from "cors";

import { routes } from "./routes";
import "./database";

class App {
  private _server;
  constructor() {
    this._server = express();
    this.middlewares();
    this.routes();
  }

  get server() {
    return this._server;
  }

  middlewares() {
    this._server.use(express.json());
    this._server.use(cors());
  }

  routes() {
    this._server.use(routes);
  }
}

export default new App().server;
