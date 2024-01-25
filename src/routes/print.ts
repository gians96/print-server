import { Router } from "express";
import { printCtrl, isConnected } from "../controllers/print.ctrl";
import { validateAuth } from "../validators/auth.valid";

const router = Router();

/*
 * http://localhost:3010/auth/register [POST]
 */


router.post("/start", printCtrl);
router.post("/connect", isConnected);


export { router };
