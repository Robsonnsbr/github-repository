import { Router } from "express";

import {
  hello,
  products,
  usersController,
  repositoriesController,
} from "../controllers";
export const routes = Router();

routes.get("/", hello);

routes.get("/products", products);

// RESTfull
// User
routes.get("/users", usersController.getAll);
routes.get("/users/:id", usersController.getOne);
routes.post("/users", usersController.create);
routes.put("/users/:id", usersController.update);
routes.delete("/users/:id", usersController.delete);

// Repositories
routes.get(
  "/repositories/:user_id/repositories",
  repositoriesController.getAll
);
routes.post(
  "/repositories/:user_id/repositories",
  repositoriesController.create
);
// routes.get("/repositories/:id", repositoriesController.getOne);
// routes.post("/repositories", repositoriesController.create);
// routes.put("/repositories/:id", repositoriesController.update);
// routes.delete("/repositories/:id", repositoriesController.delete);
