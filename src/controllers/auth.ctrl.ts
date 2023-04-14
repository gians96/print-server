import { Request, Response } from "express";
import { registerNewUser, loginUser } from "../services/auth.srv";
import { handleHttp } from "../utils/error.handle";

const registerCtrl = async ({ body }: Request, res: Response) => {
  try {
    const response = await registerNewUser(body);
    res.status(200).send(response);
  } catch (error) {
    handleHttp(res, "ERROR_REGISTER_AUTH");
  }
};
const getCtrl = async ({ body }: Request, res: Response) => {
  try {
   
    res.send("<h1>Auth</h1>");
  } catch (error) {
    handleHttp(res, "ERROR_REGISTER_AUTH");
  }
};
const loginCtrl = async ({ body }: Request, res: Response) => {
  try {
    const { email, password } = body;
    const response = await loginUser({ email, password });
    if (response === "PASSWORD_INCORRECT")
      return res.status(403).send(response);

    res.status(200).send(response);
  } catch (error) {
    handleHttp(res, "ERROR_LOGIN_AUTH");
  }
};

export { registerCtrl, loginCtrl, getCtrl };
