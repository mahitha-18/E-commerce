import express from "express";
import CouponRedemptionController from "../controller/couponredemptionController.js";

const router = express.Router();

router.post("/create", CouponRedemptionController.create);
router.get("/getall", CouponRedemptionController.getAll);
router.get("/getby/:id", CouponRedemptionController.getById);
router.get("/user/:userId", CouponRedemptionController.getByUser);
router.get("/coupon/:couponId", CouponRedemptionController.getByCoupon);
router.put("/update/:id", CouponRedemptionController.update);
router.delete("/delete/:id", CouponRedemptionController.delete);

export default router;
