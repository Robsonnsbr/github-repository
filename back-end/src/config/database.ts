import * as dotenv from "dotenv";
dotenv.config();

export const url =
  process.env.MONGODB_URL ||
  "mongodb+srv://root:root@repositorygithub.nghxluq.mongodb.net/?retryWrites=true&w=majority";
