import express from "express";
import OrderStatusHistoryController from "../controller/orderstatushistoryController.js";

const router = express.Router();

router.post("/create", OrderStatusHistoryController.create);
router.get("/getall", OrderStatusHistoryController.getAll);
router.get("/getby/:id", OrderStatusHistoryController.getById);
router.get("/order/:orderId", OrderStatusHistoryController.getByOrder);
router.delete("/delete/:id", OrderStatusHistoryController.delete);

export default router;
