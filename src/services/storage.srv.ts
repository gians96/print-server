import { Storage } from "../interfaces/storage.interface";
import uploadModel from "../models/storage.model";

const registerFile = async ({ fileName, path, idUser }: Storage) => {
  const response = await uploadModel.create({ fileName, path, idUser });
  return response;
};

export { registerFile };
