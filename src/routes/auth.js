"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const auth_ctrl_1 = require("../controllers/auth.ctrl");
const router = (0, express_1.Router)();
exports.router = router;
/*
 * http://localhost:3010/auth/register [POST]
 */
router.post("/register", auth_ctrl_1.registerCtrl);
/**
 * http://localhost:3010/auth/login [POST]
 */
router.post("/login", auth_ctrl_1.loginCtrl);
