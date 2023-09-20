"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const database_1 = require("../config/database");
class Database {
    constructor() {
        this._connection = this.connect();
        this._connection
            .then(() => {
            console.log("Conectado ao MongoDB");
        })
            .catch((error) => {
            console.error("Erro na conexão com o MongoDB:", error);
        });
        mongoose_1.default.connection.on("disconnected", () => {
            console.log("Desconectado do MongoDB");
        });
        mongoose_1.default.connection.on("error", (error) => {
            console.error("Erro na conexão com o MongoDB:", error);
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose_1.default.connect(database_1.url, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                });
                return mongoose_1.default.connection;
            }
            catch (error) {
                throw new Error(`Erro na conexão com o MongoDB: ${error.message}`);
            }
        });
    }
}
exports.default = new Database();
