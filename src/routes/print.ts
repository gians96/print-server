import { Router } from "express";
import { isConnectedPrint, isConnectedServer, printCommand, printPreAccount, printAccountTest } from "../controllers/print.ctrl";
import { validateAuth } from "../validators/auth.valid";

const router = Router();

/*
 * http://localhost:3010/auth/register [POST]
 */


router.post("/print_command", printCommand);
router.post("/print_preaccount_test", printAccountTest);
router.post("/print_preaccount", printPreAccount);

router.post("/connect_print", isConnectedPrint);
router.post("/connect_server", isConnectedServer);


export { router };
