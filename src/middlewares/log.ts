import { NextFunction, Request, Response } from "express";

const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers;

  console.log(header); //podemos capturar en donde se esta realizando la peticion, dispostivo, IP, etc y guardarlo.

  next();
};
export { logMiddleware };
