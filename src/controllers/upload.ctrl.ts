import { Response } from "express";
import { Storage } from "../interfaces/storage.interface";
import { RequestExt } from "../interfaces/user.interface";
import { registerFile } from "../services/storage.srv";
import { handleHttp } from "../utils/error.handle";

const getFile = async (req: RequestExt, res: Response) => {
  try {
    const { user, file } = req;
    const dataToRegister: Storage = {
      fileName: `${file?.filename}`,
      idUser: `${user?.id}`,
      path: `${file?.path}`
    };
    const response = await registerFile(dataToRegister);
    res.send(response);
  } catch (error) {
    handleHttp(res, "ERROR_GET_BLOG");
  }
};
export { getFile };
