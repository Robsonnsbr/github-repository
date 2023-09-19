import User from "../../models/User";
import { Response, Request } from "express";
import { createPasswordHash } from "../../services/auth";

export class UsersController {
  public getAll = async (req: any, res: Response) => {
    try {
      const users = await User.find();
      return res.status(200).json(users);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  };
  public getOne = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ message: "not found!" });
      }

      return res.json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  };

  // public getOne = async (req: any, res: IParams) => {
  //   try {
  //     const { email, password } = JSON.parse(req.body);
  //     const user = await User.findOne({ email, password });
  //     if (!user) {
  //       return res.status(422).json({ message: `User ${email} not exists.` });
  //     }
  //     if (email === user.email && password === user.password) {
  //       //fazer alguma coisa... retornar token ?
  //       return res
  //         .status(200)
  //         .json({ message: `User ${user.email} Logged successfully.` });
  //     }
  //     return res
  //       .status(400)
  //       .json({ message: `Incorrect username or password.` });
  //   } catch (err) {
  //     console.error(err);
  //     return res.status(500).json({ error: "Internal server error." });
  //   }
  // };

  public create = async (req: any, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        return res
          .status(422)
          .json({ message: `User ${email} already exists.` });
      }

      //criptografar o password
      const encryptedPassword = await createPasswordHash(password);
      const newUser = await User.create({ email, password: encryptedPassword });

      return res
        .status(201)
        .json({ message: `User ${newUser.email} registered successfully.` });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  };
  public update = async (req: any, res: Response) => {
    try {
      const { id } = req.params;
      const { email, password } = req.body;
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }

      //criptografar o password
      const encryptedPassword = await createPasswordHash(password);

      await user.updateOne({ email, password: encryptedPassword });

      return res
        .status(200)
        .json({ message: `User ${user.email} updated successfully.` });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  };
  public delete = async (req: any, res: Response) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }

      await user.deleteOne();
      return res.status(200).json({ message: "User deleted successfully." });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  };
}
