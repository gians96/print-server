"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const order_ctrl_1 = require("../controllers/order.ctrl");
const session_1 = require("../middlewares/session");
/**
 * Esta ruta solo puede acceder la sesiones acativa
 * que tenga JWT valido!
 */
const router = (0, express_1.Router)();
exports.router = router;
router.get("/", session_1.ValidateSession, order_ctrl_1.getOrders);
