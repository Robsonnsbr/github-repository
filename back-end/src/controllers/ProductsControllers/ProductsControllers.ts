interface IParams {
  json: (args: { message: string }) => void;
}

export class ProductsController {
  public index = async (req: any, res: IParams) => {
    res.json({ message: "[produto1, produto2, produto2]" });
  };
}
