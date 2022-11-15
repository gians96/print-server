import { NextFunction, request, Request, Response } from "express";
import { check } from "express-validator";
import { validateResult } from "../utils/validate.handle";

const validateUser = [
  check("name").exists().not().isEmpty(),
  check("description").exists().not().isEmpty(),
  check("email").exists().not().isEmpty().isEmail(),
  check("password")
    .exists()
    .not()
    .isEmpty()
    .custom((value, { req: Request }) => {
      if (value < 18 || value > 40) {
        throw new Error("Rango de edad debe ser entre 18 y 40");
      }
      return true;
    }),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  }
];

export { validateUser };
