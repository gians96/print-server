"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateSession = void 0;
const jwt_handle_1 = require("../utils/jwt.handle");
const ValidateSession = (req, res, next) => {
    try {
        const jwtBearer = req.headers.authorization || "";
        const jwt = jwtBearer.split(" ").pop();
        const isUser = (0, jwt_handle_1.verifyToken)(`${jwt}`);
        if (!isUser)
            return res.status(401).send("JWT_INVALID");
        req.user = isUser;
        next();
    }
    catch (error) {
        res.status(401).send("SESSION_NO_VALID");
    }
};
exports.ValidateSession = ValidateSession;
