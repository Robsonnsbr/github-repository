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
exports.authConfig = exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = __importDefault(require("../config/auth"));
exports.authConfig = auth_1.default;
const util_1 = require("util");
const verifyTokenCallback = (token, secret, callback) => {
    jsonwebtoken_1.default.verify(token, secret, callback);
};
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: "Token não foi fornecido." });
    }
    const [, token] = authHeader.split(" ");
    try {
        const verifyAsync = (0, util_1.promisify)(verifyTokenCallback);
        const decoded = yield verifyAsync(token, auth_1.default.secret);
        if (!decoded || typeof decoded !== "object" || !("id" in decoded)) {
            throw new Error("Token inválido ou expirou.");
        }
        req.userId = decoded.id;
        return next();
    }
    catch (error) {
        console.error(`Erro na autenticação ou Token inválido! ${error.message}`);
        return res
            .status(401)
            .json({ message: "Erro na autenticação ou Token inválido!" });
    }
});
exports.auth = auth;
