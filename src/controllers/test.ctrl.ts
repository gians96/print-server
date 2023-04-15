import { Request, Response } from "express";
import { registerTest } from "../services/test.srv";
import { handleHttp } from "../utils/error.handle";

const testCtrl = async ({ body }: Request, res: Response) => {
  try {
    const response = await registerTest(body);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }

};

export { testCtrl };
