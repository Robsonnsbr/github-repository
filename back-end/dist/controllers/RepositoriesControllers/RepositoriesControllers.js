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
exports.RepositoriesController = void 0;
const User_1 = __importDefault(require("../../models/User"));
const Repository_1 = __importDefault(require("../../models/Repository"));
class RepositoriesController {
    constructor() {
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_id } = req.params;
                const user = yield User_1.default.findById(user_id);
                if (!user) {
                    return res.status(404).json({ message: "not found!" });
                }
                const repositories = yield Repository_1.default.find({ userId: user_id });
                return res.status(200).json(repositories);
            }
            catch (err) {
                console.error(err);
                return res.status(500).json({ error: "Internal server error." });
            }
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_id } = req.params;
                const { name, url } = req.body;
                const user = yield User_1.default.findById(user_id);
                if (!user) {
                    return res.status(404).json({ message: "not found!" });
                }
                const repository = yield Repository_1.default.findOne({ userId: user_id, url });
                if (repository) {
                    return res
                        .status(422)
                        .json({ message: `Repository ${url} already exists.` });
                }
                yield Repository_1.default.create({
                    name,
                    url,
                    userId: user_id,
                });
                return res.status(201).json({
                    message: `Repository: ${name} registered successfully.`,
                });
            }
            catch (err) {
                console.error(err);
                return res.status(500).json({ error: "Internal server error." });
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_id, id } = req.params;
                const user = yield User_1.default.findById(user_id);
                if (!user) {
                    return res.status(404).json({ message: "User not found!" });
                }
                const repository = yield Repository_1.default.findOne({ userId: user_id, _id: id });
                if (!repository) {
                    return res.status(404).json({ message: "Repository not found!" });
                }
                yield repository.deleteOne();
                return res
                    .status(200)
                    .json({ message: "Repository deleted successfully." });
            }
            catch (err) {
                console.error(err);
                return res.status(500).json({ error: "Internal server error." });
            }
        });
    }
}
exports.RepositoriesController = RepositoriesController;
