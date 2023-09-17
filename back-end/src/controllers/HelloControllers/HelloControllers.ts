interface IParams {
  json: (args: { message: string }) => void;
}

export class HelloController {
  public index = async (req: any, res: IParams) => {
    res.json({ message: "Hello Worldddd!" });
  };
}
