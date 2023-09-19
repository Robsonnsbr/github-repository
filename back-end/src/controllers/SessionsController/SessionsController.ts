import jwt from "jsonwebtoken";

import { Request, Response } from "express";

import User from "../../models/User";
import { checkPassword } from "../../services/auth";
import { authConfig } from "../../middlewares/auth";

export class SessionsController {
  async create(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "User/Password invalid." });
    }

    if (!checkPassword(password, user)) {
      return res.status(401).json({ error: "User/Password invalid." });
    }

    const { id } = user;

    return res.json({
      user: { id, email },
      token: jwt.sign({ id }, authConfig.secret),
      expiresIn: authConfig.expiresIn,
    });
  }
}
