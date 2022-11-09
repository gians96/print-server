"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const routes_1 = require("./routes");
const mongo_1 = __importDefault(require("./config/mongo"));
const PORT = process.env.PORT || 3010;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(routes_1.router);
(0, mongo_1.default)().then(() => console.log("Conexion Ready"));
app.listen(PORT, () => console.log(`Listo por el puerto ${PORT}`));
