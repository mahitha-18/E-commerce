import express from "express";
import OrderItemController from "../controller/orderitemController.js";

const router = express.Router();

router.post("/create", OrderItemController.create);
router.get("/getall", OrderItemController.getAll);
router.get("/getby/:id", OrderItemController.getById);
router.get("/order/:orderId", OrderItemController.getByOrder);
router.put("/update/:id", OrderItemController.update);
router.delete("/delete/:id", OrderItemController.delete);

export default router;
