import { Request, Response } from "express";
import { registerTest, getTests } from "../services/test.srv";
import { handleHttp } from "../utils/error.handle";

const testCtrl = async ({ body }: Request, res: Response) => {
  try {
    const response = await registerTest(body);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getTestsCtrl = async (req: Request, res: Response) => {
  try {
    const response = await getTests();
    res.status(200).send(response);
  } catch (error) {
    handleHttp(res, "ERROR_GET_ITEMs");
  }
};

export { testCtrl, getTestsCtrl };
