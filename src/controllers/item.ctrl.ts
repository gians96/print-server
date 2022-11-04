import { Request, Response } from "express";
import {
  insertCar,
  getCars,
  getCar,
  updateCar,
  deleteCar
} from "../services/item.srv";
import { handleHttp } from "../utils/error.handle";

const getItem = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const response = await getCar(id);
    const data = response ? response : "NOT_FOUND";
    res.status(200).send(data);
  } catch (error) {
    handleHttp(res, "ERROR_GET_ITEM");
  }
};
const getItems = async (req: Request, res: Response) => {
  try {
    const response = await getCars();
    res.status(200).send(response);
  } catch (error) {
    handleHttp(res, "ERROR_GET_ITEMs");
  }
};
const updateItem = async ({ params, body }: Request, res: Response) => {
  try {
    const { id } = params;
    const response = await updateCar(id, body);
    res.status(200).send(response);
  } catch (error) {
    handleHttp(res, "ERROR_UPDATE_ITEM");
  }
};
const postItem = async ({ body }: Request, res: Response) => {
  try {
    const responseItem = await insertCar(body);
    res.status(200).send(responseItem);
  } catch (error) {
    handleHttp(res, "ERROR_POSRT_ITEM", error);
  }
};
const deleteItem = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const response = await deleteCar(id);
    res.status(200).send(response);
  } catch (error) {
    handleHttp(res, "ERROR_DELETE_ITEM");
  }
};

export { deleteItem, getItem, postItem, getItems, updateItem };
