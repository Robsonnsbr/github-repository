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
exports.UsersController = void 0;
const User_1 = __importDefault(require("../../models/User"));
const auth_1 = require("../../services/auth");
class UsersController {
    constructor() {
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield User_1.default.find();
                return res.status(200).json(users);
            }
            catch (err) {
                console.error(err);
                return res.status(500).json({ error: "Internal server error." });
            }
        });
        this.getOne = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield User_1.default.findById(id);
                if (!user) {
                    return res.status(404).json({ message: "not found!" });
                }
                return res.json(user);
            }
            catch (err) {
                console.error(err);
                return res.status(500).json({ error: "Internal server error." });
            }
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield User_1.default.findOne({ email });
                if (user) {
                    return res
                        .status(422)
                        .json({ message: `User ${email} already exists.` });
                }
                const encryptedPassword = yield (0, auth_1.createPasswordHash)(password);
                const newUser = yield User_1.default.create({ email, password: encryptedPassword });
                return res
                    .status(201)
                    .json({ message: `User ${newUser.email} registered successfully.` });
            }
            catch (err) {
                console.error(err);
                return res.status(500).json({ error: "Internal server error." });
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { email, password } = req.body;
                const user = yield User_1.default.findById(id);
                if (!user) {
                    return res.status(404).json({ message: "User not found!" });
                }
                const encryptedPassword = yield (0, auth_1.createPasswordHash)(password);
                yield user.updateOne({ email, password: encryptedPassword });
                return res
                    .status(200)
                    .json({ message: `User ${user.email} updated successfully.` });
            }
            catch (err) {
                console.error(err);
                return res.status(500).json({ error: "Internal server error." });
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield User_1.default.findById(id);
                if (!user) {
                    return res.status(404).json({ message: "User not found!" });
                }
                yield user.deleteOne();
                return res.status(200).json({ message: "User deleted successfully." });
            }
            catch (err) {
                console.error(err);
                return res.status(500).json({ error: "Internal server error." });
            }
        });
    }
}
exports.UsersController = UsersController;
