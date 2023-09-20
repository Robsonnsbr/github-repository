import { IndexApiController } from "./indexApi/IndexApiControllers";
import { ProductsController } from "./ProductsControllers/ProductsControllers";
import { UsersController } from "./UsersControllers/UsersControllers";
import { RepositoriesController } from "./RepositoriesControllers/RepositoriesControllers";
import { SessionsController } from "./SessionsController/SessionsController";

const indexApiController = new IndexApiController();
const sessionsController = new SessionsController();
const usersController = new UsersController();
const repositoriesController = new RepositoriesController();
const productsController = new ProductsController();

export {
  indexApiController,
  sessionsController,
  usersController,
  repositoriesController,
  productsController,
};
