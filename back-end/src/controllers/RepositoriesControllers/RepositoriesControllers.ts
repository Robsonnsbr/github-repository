import User from "../../models/User";
import Repository from "../../models/Repository";
import { Response, Request } from "express";
import { createPasswordHash } from "../../services/auth";

export class RepositoriesController {
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
      const user = await User.findById(user_id);
      if (!user) {
        return res.status(404).json({ message: "not found!" });
      }

      const { name, url } = req.body;

      const repository = await Repository.findOne({ url });
      if (repository) {
        return res
          .status(422)
          .json({ message: `Repository ${url} already exists.` });
      }

      const newRepository = await Repository.create({
        name,
        url,
        userId: user_id,
      });

      return res.status(201).json({
        message: `Repository ${newRepository} registered successfully.`,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  };

  // public getOne = async (req: Request, res: Response) => {
  //   try {
  //     const { id } = req.params;
  //     const repository = await Repository.findById(id);

  //     if (!repository) {
  //       return res.status(404).json({ message: "not found!" });
  //     }

  //     return res.json(repository);
  //   } catch (err) {
  //     console.error(err);
  //     return res.status(500).json({ error: "Internal server error." });
  //   }
  // };

  // public update = async (req: any, res: Response) => {
  //   try {
  //     const { id } = req.params;
  //     const { email, password } = req.body;
  //     const repository = await Repository.findById(id);

  //     if (!repository) {
  //       return res.status(404).json({ message: "Repository not found!" });
  //     }

  //     //criptografar o password
  //     const encryptedPassword = await createPasswordHash(password);

  //     await repository.updateOne({ email, password: encryptedPassword });

  //     return res.status(200).json({
  //       message: `Repository ${repository} updated successfully.`,
  //     });
  //   } catch (err) {
  //     console.error(err);
  //     return res.status(500).json({ error: "Internal server error." });
  //   }
  // };
  // public delete = async (req: any, res: Response) => {
  //   try {
  //     const { id } = req.params;
  //     const repository = await Repository.findById(id);

  //     if (!repository) {
  //       return res.status(404).json({ message: "Repository not found!" });
  //     }

  //     await repository.deleteOne();
  //     return res
  //       .status(200)
  //       .json({ message: "Repository deleted successfully." });
  //   } catch (err) {
  //     console.error(err);
  //     return res.status(500).json({ error: "Internal server error." });
  //   }
  // };
}
