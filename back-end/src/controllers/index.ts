import { HelloController } from "./HelloControllers/HelloControllers";
import { ProductsController } from "./ProductsControllers/ProductsControllers";

const helloController = new HelloController();
const hello = helloController.index;
const productsController = new ProductsController();
const products = productsController.index;

export { products, hello };
