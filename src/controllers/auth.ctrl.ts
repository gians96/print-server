import { Request, Response } from "express";
import { registerNewUser, loginUser } from "../services/auth.srv";

const registerCtrl = async ({ body }: Request, res: Response) => {
  const response = await registerNewUser(body);
  res.status(200).send(response);
};

const loginCtrl = async ({ body }: Request, res: Response) => {
  const { email, password } = body;
  const response = await loginUser({ email, password });
  if (response === "PASSWORD_INCORRECT") return res.status(403).send(response);

  res.status(200).send(response);
};

export { registerCtrl, loginCtrl };
