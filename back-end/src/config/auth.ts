import * as dotenv from "dotenv";
dotenv.config();

export default {
  secret:
    process.env.JWT_PASS ??
    "iJIUzI1NiIsInR5cCI6IkeyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTSflKxwRJSMeKKF2QT4fwpMeJf36POk6yJVadQssw5c",
  expiresIn: "7d",
};
