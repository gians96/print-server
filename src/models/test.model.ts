import { Schema, Types, model, Model } from "mongoose";

const TestSchema = new Schema<any>(
  {
    firstRange: { type: String, required: false },
    secondRange: { type: String, required: false }
  },
  { timestamps: true, versionKey: false }
);

const TestModel = model("TestDate", TestSchema);

export default TestModel;
