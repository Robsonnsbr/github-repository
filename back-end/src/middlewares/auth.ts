import { Request, Response, NextFunction } from "express";
import jwt, { VerifyCallback, Secret } from "jsonwebtoken";
import authConfig from "../config/auth";
import { promisify } from "util";

interface IParamsRequest extends Request {
  userId?: string;
}

// Função de wrapper que segue o padrão de callback do Node.js
const verifyTokenCallback = (
  token: string,
  secret: Secret,
  callback: VerifyCallback
) => {
  jwt.verify(token, secret, callback);
};

export const auth = async (
  req: IParamsRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token não foi fornecido." });
  }

  const [, token] = authHeader.split(" ");

  try {
    const verifyAsync = promisify(verifyTokenCallback); // Use a função de wrapper com promisify
    const decoded = await verifyAsync(token, authConfig.secret);

    if (!decoded || typeof decoded !== "object" || !("id" in decoded)) {
      throw new Error("Token inválido ou expirou.");
    }

    req.userId = decoded.id;
    return next();
  } catch (error: unknown) {
    console.error(
      `Erro na autenticação ou Token inválido! ${(error as Error).message}`
    );
    return res
      .status(401)
      .json({ message: "Erro na autenticação ou Token inválido!" });
  }
};

export { authConfig };
