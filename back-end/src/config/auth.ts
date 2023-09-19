import * as dotenv from "dotenv";
dotenv.config();

export default {
  secret: process.env.JWT_PASS ?? "",
  expiresIn: "7d",
};
