import express from "express";
import CouponController from "../controller/couponController.js";

const router = express.Router();

router.post("/create", CouponController.create);
router.get("/getall", CouponController.getAll);
router.get("/getby/:id", CouponController.getById);
router.put("/update/:id", CouponController.update);
router.delete("/delete/:id", CouponController.delete);

export default router;
