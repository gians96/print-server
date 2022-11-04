import ItemModel from "../models/item.model";

const getOrders = async () => {
  const response = await ItemModel.find();
  return response;
};

export { getOrders };
