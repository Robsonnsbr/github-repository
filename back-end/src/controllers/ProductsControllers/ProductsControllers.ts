interface IParams {
  json: (args: { message: string }) => void;
}

import User from "../../models/User";
import Repository from "../../models/Repository";
import { Response, Request } from "express";

export class ProductsController {
  public getAll = async (req: any, res: Response) => {
    try {
      const { user_id } = req.params;
      const user = await User.findById(user_id);
      if (!user) {
        return res.status(404).json({ message: "not found!" });
      }

      const repositories = await Repository.find({ userId: user_id });

      return res.status(200).json(repositories);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  };

  public create = async (req: any, res: Response) => {
    try {
      const { user_id } = req.params;
      const { name, url } = req.body;

      const user = await User.findById(user_id);
      if (!user) {
        return res.status(404).json({ message: "not found!" });
      }

      const repository = await Repository.findOne({ userId: user_id, url });
      if (repository) {
        return res
          .status(422)
          .json({ message: `Repository ${url} already exists.` });
      }

      await Repository.create({
        name,
        url,
        userId: user_id,
      });

      return res.status(201).json({
        message: `Repository: ${name} registered successfully.`,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  };
  public delete = async (req: any, res: Response) => {
    try {
      const { user_id, id } = req.params;

      const user = await User.findById(user_id);
      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }

      const repository = await Repository.findOne({ userId: user_id, _id: id });
      if (!repository) {
        return res.status(404).json({ message: "Repository not found!" });
      }

      await repository.deleteOne();

      return res
        .status(200)
        .json({ message: "Repository deleted successfully." });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  };
}
