import { Router } from "express";
import { getFile } from "../controllers/upload.ctrl";
import multerMiddleware from "../middlewares/file";
import { ValidateSession } from "../middlewares/session";

const router = Router();

router.post("/", ValidateSession, multerMiddleware.single("myFile"), getFile);
export { router };
