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
exports.SessionsController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../../models/User"));
const auth_1 = require("../../services/auth");
const auth_2 = require("../../middlewares/auth");
class SessionsController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const user = yield User_1.default.findOne({ email });
            if (!user) {
                return res.status(401).json({ error: "User/Password invalid." });
            }
            if (!(0, auth_1.checkPassword)(password, user)) {
                return res.status(401).json({ error: "User/Password invalid." });
            }
            const { id } = user;
            return res.json({
                user: { id, email },
                token: jsonwebtoken_1.default.sign({ id }, auth_2.authConfig.secret),
                expiresIn: auth_2.authConfig.expiresIn,
            });
        });
    }
}
exports.SessionsController = SessionsController;
