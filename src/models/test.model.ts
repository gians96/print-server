import { Schema, Types, model, Model } from "mongoose";

const TestSchema = new Schema<any>(
  {
    firstRange: { type: String, default: "Soy Test" },
    secondRange: { type: String, default: "Soy Test" }
  },
  { timestamps: true, versionKey: false }
);

const TestModel = model("Test", TestSchema);

export default TestModel;
