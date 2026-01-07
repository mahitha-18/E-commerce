import express from "express";
import OrderController from "../controller/orderController.js";

const router = express.Router();

router.post("/create", OrderController.create);
router.get("/getall", OrderController.getAll);
router.get("/getby/:id", OrderController.getById);
router.put("/update/:id", OrderController.update);
router.delete("/delete/:id", OrderController.delete);

export default router;
