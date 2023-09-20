import { Router } from "express";
import { auth } from "../middlewares/auth";

import {
  indexApiController,
  usersController,
  repositoriesController,
  sessionsController,
  productsController,
} from "../controllers";
export const routes = Router();

//  RESTfull
// Public route
routes.get("/", indexApiController.index);
routes.post("/sessions", sessionsController.create);

//Private route
routes.use(auth);
// User
routes.get("/users", usersController.getAll);
routes.get("/users/:id", usersController.getOne);
routes.post("/users", usersController.create);
routes.put("/users/:id", usersController.update);
routes.delete("/users/:id", usersController.delete);

// Repositories
routes.get("/users/:user_id/repositories", repositoriesController.getAll);
routes.post("/users/:user_id/repositories", repositoriesController.create);
routes.delete(
  "/users/:user_id/repositories/:id",
  repositoriesController.delete
);

// Products => atualmente sem utilidade
//TODO: corrigir class productsController e criar class carrinho add também ao usuário itens selecionados
routes.get("/products", productsController.getAll);
