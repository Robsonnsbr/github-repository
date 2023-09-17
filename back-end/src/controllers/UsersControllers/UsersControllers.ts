import User from "../../models/User";
import { Response } from "express";

interface IParams {
  status(arg0: number): Response;
}

export class UsersController {
  public index = async (req: any, res: IParams) => {
    try {
      const users = await User.find();
      return res.status(200).json(users);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: "Internal server error." });
    }
  };

  // public select = async (req: any, res: IParams) => {
  //   res.json({});
  // };
  // public create = async (req: any, res: IParams) => {
  //   res.json({});
  // };
  // public update = async (req: any, res: IParams) => {
  //   res.json({});
  // };
  // public delete = async (req: any, res: IParams) => {
  //   res.json({});
  // };
}
