import { Schema, Types, model, Model } from "mongoose";
import { Storage } from "../interfaces/storage.interface";

const ItemSchema = new Schema<Storage>(
  {
    fileName: { type: String, required: true },
    path: { type: String, required: true },
    idUser: { type: String, required: true }
  },
  { timestamps: true, versionKey: false }
);

const ItemModel = model("storage", ItemSchema);

export default ItemModel;
