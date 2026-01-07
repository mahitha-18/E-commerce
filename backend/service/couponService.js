import Coupon from "../model/couponModel.js";

class CouponService {
  static async create(data) {
    return await Coupon.create(data);
  }

  static async getAll(filter = {}) {
    return await Coupon.find(filter).sort({ created_at: -1 });
  }

  static async getById(id) {
    return await Coupon.findById(id);
  }

  static async update(id, data) {
    return await Coupon.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );
  }

  static async delete(id) {
    return await Coupon.findByIdAndDelete(id);
  }
}

export default CouponService;
