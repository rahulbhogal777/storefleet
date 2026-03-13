// Please don't change the pre-written code
// Import the necessary modules here

import { createNewOrderRepo, getSingleOrderRepo, updateStatusRepo } from "../model/order.repository.js";
import { ErrorHandler } from "../../../utils/errorHandler.js";
import { updateProductRepo } from "../../product/model/product.repository.js";

export const createNewOrder = async (req, res, next) => {
  // Write your code here for placing a new order
  try {
    const newOrder = await createNewOrderRepo({ ...req.body, user: req.user._id });
    if (newOrder) {
      res.status(201).json({ success: true, newOrder });
    } else {
      return next(new ErrorHandler(400, "some error occured!"));
    }
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

export const getSingleOrder = async (req, res, next) => {
  const id = req.params.id;
  try {
    const getOrder = await getSingleOrderRepo(id);
    if (getOrder) {
      res.status(200).json({ success: true, getOrder });
    } else {
      return next(new ErrorHandler(400 , "Order not found."));
    }
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
}

export const updateStatus = async (req, res, next) => {
  const id = req.params.id;
  try {
    const order = await updateStatusRepo(id, req.body);
    if (order) {
      res.status(200).json({ success: true, order });
    } else {
      return next(new ErrorHandler(400, "Some error occured!"));
    }
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
}
