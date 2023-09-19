import * as dotenv from "dotenv";
import App from "./app";

dotenv.config();
const PORT = Number(process.env.SERVER_PORT) || 4000;

App.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
