import bcrypt from "bcrypt";

export const createPasswordHash = async (password: string) =>
  bcrypt.hash(password, 8);

export const checkPassword = (password: string, user: any) =>
  bcrypt.compare(password, user.password);
