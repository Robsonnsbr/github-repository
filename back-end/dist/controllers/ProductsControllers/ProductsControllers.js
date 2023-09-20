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
exports.ProductsController = void 0;
const User_1 = __importDefault(require("../../models/User"));
const Product_1 = __importDefault(require("../../models/Product"));
class ProductsController {
    constructor() {
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_id } = req.params;
                const user = yield User_1.default.findById(user_id);
                if (!user) {
                    return res.status(404).json({ message: "not found!" });
                }
                const items = yield Product_1.default.find({ userId: user_id });
                return res.status(200).json(items);
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
                const product = yield Product_1.default.findOne({ userId: user_id, url });
                if (product) {
                    return res
                        .status(422)
                        .json({ message: `Product ${url} already exists.` });
                }
                yield Product_1.default.create({
                    name,
                    url,
                    userId: user_id,
                });
                return res.status(201).json({
                    message: `Product: ${name} registered successfully.`,
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
                const product = yield Product_1.default.findOne({ userId: user_id, _id: id });
                if (!product) {
                    return res.status(404).json({ message: "Product not found!" });
                }
                yield product.deleteOne();
                return res.status(200).json({ message: "Product deleted successfully." });
            }
            catch (err) {
                console.error(err);
                return res.status(500).json({ error: "Internal server error." });
            }
        });
    }
}
exports.ProductsController = ProductsController;
