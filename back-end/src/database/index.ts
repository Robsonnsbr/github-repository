import mongoose from "mongoose";
import { url } from "../config/database";

class Database {
  private _connection: Promise<typeof mongoose>;
  constructor() {
    this._connection = mongoose.connect(url, {});
  }
}

export default new Database();
