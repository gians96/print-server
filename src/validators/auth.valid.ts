import { NextFunction, request, Request, Response } from "express";
import { check } from "express-validator";
import { validateResult } from "../utils/validate.handle";

const validateAuth = [
  check("email").exists().not().isEmpty().isEmail(),
  check("password").exists().not().isEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  }
];

export { validateAuth };
