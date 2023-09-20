import mongoose, { Connection } from "mongoose";
import { url } from "../config/database";

//TODO: tratar corretamente a conexão com mongo
class Database {
  private _connection: Promise<Connection>;

  constructor() {
    this._connection = this.connect();
    this._connection
      .then(() => {
        console.log("Conectado ao MongoDB");
      })
      .catch((error) => {
        console.error("Erro na conexão com o MongoDB:", error);
      });

    mongoose.connection.on("disconnected", () => {
      console.log("Desconectado do MongoDB");
    });

    mongoose.connection.on("error", (error) => {
      console.error("Erro na conexão com o MongoDB:", error);
    });
  }

  private async connect() {
    try {
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as mongoose.ConnectOptions); // Usamos 'as' para informar que é um ConnectOptions

      return mongoose.connection;
    } catch (error: any) {
      throw new Error(`Erro na conexão com o MongoDB: ${error.message}`);
    }
  }
}

export default new Database();
