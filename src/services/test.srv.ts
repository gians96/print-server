import TestModel from "../models/test.model";
import UserModel from "../models/user.model";
const registerTest = async ({ firstRange, secondRange }: any) => {
  const response = await TestModel.create({ firstRange, secondRange });
  return response;
};

const getTests = async () => {
  const response = await UserModel.find();
  return response;
};

export { registerTest, getTests };
