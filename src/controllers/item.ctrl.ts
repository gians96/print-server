import { Request, Response } from "express";
import { insertItem } from "../services/item.srv";
import { handleHttp } from "../utils/error.handle";

const getItem = (req: Request, res: Response) => {
  try {
  } catch (error) {
    handleHttp(res, "ERROR_GET_ITEM");
  }
};
const getItems = (req: Request, res: Response) => {
  try {
  } catch (error) {
    handleHttp(res, "ERROR_GET_ITEMs");
  }
};
const updateItem = (req: Request, res: Response) => {
  try {
  } catch (error) {
    handleHttp(res, "ERROR_UPDATE_ITEM");
  }
};
const postItem = async ({ body }: Request, res: Response) => {
  try {
    const responseItem = await insertItem(body);
    res.status(200).send(responseItem);
  } catch (error) {
    handleHttp(res, "ERROR_POSRT_ITEM", error);
  }
};
const deleteItem = (req: Request, res: Response) => {
  try {
  } catch (error) {
    handleHttp(res, "ERROR_DELETE_ITEM");
  }
};

export { deleteItem, getItem, postItem, getItems, updateItem };
