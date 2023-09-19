import { HelloController } from "./HelloControllers/HelloControllers";
import { ProductsController } from "./ProductsControllers/ProductsControllers";
import { UsersController } from "./UsersControllers/UsersControllers";
import { RepositoriesController } from "./RepositoriesControllers/RepositoriesControllers";

const helloController = new HelloController();
const hello = helloController.index;

const productsController = new ProductsController();
const products = productsController.index;

const usersController = new UsersController();
const repositoriesController = new RepositoriesController();

export { products, hello, usersController, repositoriesController };
