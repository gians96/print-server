"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ItemSchema = new mongoose_1.Schema({
    fileName: { type: String, required: true },
    path: { type: String, required: true },
    idUser: { type: String, required: true }
}, { timestamps: true, versionKey: false });
const ItemModel = (0, mongoose_1.model)("storage", ItemSchema);
exports.default = ItemModel;
