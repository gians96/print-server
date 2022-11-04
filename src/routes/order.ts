import { Router } from "express";
import { getOrders } from "../controllers/order.ctrl";
import { ValidateSession } from "../middlewares/session";
/**
 * Esta ruta solo puede acceder la sesiones acativa
 * que tenga JWT valido!
 */
const router = Router();

router.get("/", ValidateSession, getOrders);
export { router };
