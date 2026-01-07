import express from "express";
import RefundController from "../controller/refundController.js";

const router = express.Router();

router.post("/create", RefundController.create);
router.get("/getall", RefundController.getAll);
router.get("/getby/:id", RefundController.getById);
router.put("/update/:id", RefundController.update);
router.delete("/delete/:id", RefundController.delete);

export default router;
