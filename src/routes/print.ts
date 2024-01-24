import { Router } from "express";
import { printCtrl, printTest1Ctrl, printTest2Ctrl } from "../controllers/print.ctrl";
import { validateAuth } from "../validators/auth.valid";

const router = Router();

/*
 * http://localhost:3010/auth/register [POST]
 */
router.post("/", printCtrl);

router.post("/clean", printTest1Ctrl);
router.post("/2", printTest2Ctrl);

export { router };
