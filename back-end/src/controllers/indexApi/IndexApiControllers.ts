import { Request, Response } from "express";

export class IndexApiController {
  public index = async (_: Request, res: Response) => {
    res.status(200).json({ message: "WellCome to API!" });
  };
}
