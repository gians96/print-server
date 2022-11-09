"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logMiddleware = void 0;
const logMiddleware = (req, res, next) => {
    const header = req.headers;
    console.log(header); //podemos capturar en donde se esta realizando la peticion, dispostivo, IP, etc y guardarlo.
    next();
};
exports.logMiddleware = logMiddleware;
