import bcrypt from "bcrypt";

export const createPasswordHash = async (password: string) =>
  bcrypt.hash(password, 8);
