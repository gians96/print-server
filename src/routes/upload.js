"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const upload_ctrl_1 = require("../controllers/upload.ctrl");
const file_1 = __importDefault(require("../middlewares/file"));
const session_1 = require("../middlewares/session");
const router = (0, express_1.Router)();
exports.router = router;
router.post("/", session_1.ValidateSession, file_1.default.single("myFile"), upload_ctrl_1.getFile);
