import express from "express";
import PaymentController from "../controller/paymentController.js";

const router = express.Router();

router.post("/create", PaymentController.create);
router.get("/getall", PaymentController.getAll);
router.get("/getby/:id", PaymentController.getById);
router.put("/update/:id", PaymentController.update);
router.delete("/delete/:id", PaymentController.delete);

export default router;
