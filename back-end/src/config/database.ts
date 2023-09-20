import * as dotenv from "dotenv";
dotenv.config();

export const url = process.env.MONGODB_URL || "";
