import TestModel from "../models/test.model";
const registerTest = async ({ firstRange, secondRange }: any) => {
  const response = await TestModel.create({ firstRange, secondRange });
  return response;
};

export { registerTest };
