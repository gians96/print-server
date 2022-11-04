import { Request, Response } from "express";
import { RequestExt } from "../interfaces/user.interface";

import { handleHttp } from "../utils/error.handle";

const getOrders = async (req: RequestExt, res: Response) => {
  try {
    // const response = await getCars();
    res
      .status(200)
      .send({
        data: "Esto solo lo ve las personas con sesion / JWT",
        user: req.user
      });
  } catch (error) {
    handleHttp(res, "ERROR_GET_ORDERS");
  }
};

export { getOrders };
