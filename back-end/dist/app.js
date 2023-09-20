"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
require("./database");
class App {
    constructor() {
        this._server = (0, express_1.default)();
        this.middlewares();
        this.routes();
    }
    get server() {
        return this._server;
    }
    middlewares() {
        this._server.use(express_1.default.json());
        this._server.use((0, cors_1.default)());
    }
    routes() {
        this._server.use(routes_1.routes);
    }
}
exports.default = new App().server;
