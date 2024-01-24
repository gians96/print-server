import { Router } from "express";
import {
  // registerSpecialityCtrl,
  getListSpecialityCtrl,
  getSpecialityCtrl,
  deleteSpecialityCtrl
} from "../controllers/specialty.ctrl";
const router = Router();

/*
 * http://localhost:3010/test/register [POST]
 */
// router.post("/register", registerSpecialityCtrl);

router.get("/", getListSpecialityCtrl);

router.get("/:id", getSpecialityCtrl);

router.delete("/:id", deleteSpecialityCtrl);

export { router };
