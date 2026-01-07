import CouponService from "../service/couponService.js";

class CouponController {
  // CREATE
  static async create(req, res) {
    try {
      const coupon = await CouponService.create(req.body);

      return res.status(201).json({
        message: "Coupon created successfully",
        data: coupon,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error creating coupon",
        error: error.message,
      });
    }
  }

  // READ ALL
  static async getAll(req, res) {
    try {
      const coupons = await CouponService.getAll(req.query);

      return res.json({
        message: "Coupons fetched successfully",
        data: coupons,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error fetching coupons",
        error: error.message,
      });
    }
  }

  // READ BY ID
  static async getById(req, res) {
    try {
      const coupon = await CouponService.getById(req.params.id);

      if (!coupon) {
        return res.status(404).json({
          message: "Coupon not found",
        });
      }

      return res.json({
        message: "Coupon fetched successfully",
        data: coupon,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error fetching coupon",
        error: error.message,
      });
    }
  }

  // UPDATE
  static async update(req, res) {
    try {
      const coupon = await CouponService.update(
        req.params.id,
        req.body
      );

      if (!coupon) {
        return res.status(404).json({
          message: "Coupon not found",
        });
      }

      return res.json({
        message: "Coupon updated successfully",
        data: coupon,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error updating coupon",
        error: error.message,
      });
    }
  }

  // DELETE
  static async delete(req, res) {
    try {
      const coupon = await CouponService.delete(req.params.id);

      if (!coupon) {
        return res.status(404).json({
          message: "Coupon not found",
        });
      }

      return res.json({
        message: "Coupon deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error deleting coupon",
        error: error.message,
      });
    }
  }
}

export default CouponController;
