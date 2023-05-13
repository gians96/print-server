import { Router } from "express";
import { testCtrl, getTestsCtrl } from "../controllers/test.ctrl";
const router = Router();

/*
 * http://localhost:3010/test/register [POST]
 */
router.post("/register", testCtrl);

router.get("/", getTestsCtrl);

export { router };
