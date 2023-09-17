import { Router } from "express";

import { hello, products } from "../controllers";
export const routes = Router();

routes.get("/", hello);
routes.get("/products", products);
