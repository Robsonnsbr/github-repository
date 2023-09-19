import { ProductsController } from "./ProductsControllers/ProductsControllers";
import { UsersController } from "./UsersControllers/UsersControllers";
import { RepositoriesController } from "./RepositoriesControllers/RepositoriesControllers";
import { SessionsController } from "./SessionsController/SessionsController";

const sessionsController = new SessionsController();
const usersController = new UsersController();
const repositoriesController = new RepositoriesController();
const productsController = new ProductsController();

export {
  sessionsController,
  usersController,
  repositoriesController,
  productsController,
};
