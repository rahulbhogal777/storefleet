import express from "express";
import { createNewOrder, getSingleOrder, updateStatus } from "../controllers/order.controller.js";
import { auth } from "../../../middlewares/auth.js";

const router = express.Router();

router.route("/new").post(auth, createNewOrder);
router.route("/:id").get(auth, getSingleOrder);
router.route("/update/:id").put(auth, updateStatus);

export default router;
