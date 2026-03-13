import OrderModel from "./order.schema.js";

export const createNewOrderRepo = async (data) => {
  // Write your code here for placing a new order
  return await OrderModel(data).save();
};

export const getSingleOrderRepo = async (_id) => {
  return await OrderModel.findById(_id);
} 

export const updateStatusRepo = async (_id, data) => {
  return await OrderModel.findByIdAndUpdate(_id, data, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });
}
