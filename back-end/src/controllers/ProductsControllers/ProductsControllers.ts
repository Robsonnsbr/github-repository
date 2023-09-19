interface IParams {
  json: (args: { message: string }) => void;
}

import User from "../../models/User";
import Product from "../../models/Product";
import { Response, Request } from "express";

export class ProductsController {
  public getAll = async (req: Request, res: Response) => {
    try {
      const { user_id } = req.params;
      const user = await User.findById(user_id);
      if (!user) {
        return res.status(404).json({ message: "not found!" });
      }

      const items = await Product.find({ userId: user_id });

      return res.status(200).json(items);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  };

  public create = async (req: Request, res: Response) => {
    try {
      const { user_id } = req.params;
      const { name, url } = req.body;

      const user = await User.findById(user_id);
      if (!user) {
        return res.status(404).json({ message: "not found!" });
      }

      const product = await Product.findOne({ userId: user_id, url });
      if (product) {
        return res
          .status(422)
          .json({ message: `Product ${url} already exists.` });
      }

      await Product.create({
        name,
        url,
        userId: user_id,
      });

      return res.status(201).json({
        message: `Product: ${name} registered successfully.`,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  };

  public delete = async (req: Request, res: Response) => {
    try {
      const { user_id, id } = req.params;

      const user = await User.findById(user_id);
      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }

      const product = await Product.findOne({ userId: user_id, _id: id });
      if (!product) {
        return res.status(404).json({ message: "Product not found!" });
      }

      await product.deleteOne();

      return res.status(200).json({ message: "Product deleted successfully." });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  };
}
