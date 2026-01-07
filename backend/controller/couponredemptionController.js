import CouponRedemptionService from "../service/couponredemptionService.js";

class CouponRedemptionController {
  static async create(req, res) {
    try {
      const redemption = await CouponRedemptionService.create(req.body);
      res.status(201).json({
        message: "Coupon redeemed successfully",
        data: redemption,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getAll(req, res) {
    const data = await CouponRedemptionService.getAll();
    res.json({ data });
  }

  static async getById(req, res) {
    const data = await CouponRedemptionService.getById(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Coupon redemption not found" });
    }
    res.json({ data });
  }

  static async getByUser(req, res) {
    const data = await CouponRedemptionService.getByUser(req.params.userId);
    res.json({ data });
  }

  static async getByCoupon(req, res) {
    const data = await CouponRedemptionService.getByCoupon(req.params.couponId);
    res.json({ data });
  }

  static async update(req, res) {
    const data = await CouponRedemptionService.update(
      req.params.id,
      req.body
    );
    if (!data) {
      return res.status(404).json({ message: "Coupon redemption not found" });
    }
    res.json({
      message: "Coupon redemption updated successfully",
      data,
    });
  }

  static async delete(req, res) {
    const data = await CouponRedemptionService.delete(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Coupon redemption not found" });
    }
    res.json({ message: "Coupon redemption deleted successfully" });
  }
}

export default CouponRedemptionController;
