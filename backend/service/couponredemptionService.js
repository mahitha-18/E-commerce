import CouponRedemption from "../model/couponredemptionModel.js";

class CouponRedemptionService {
  static create(data) {
    return CouponRedemption.create(data);
  }

  static getAll() {
    return CouponRedemption.find().sort({ redeemed_at: -1 });
  }

  static getById(id) {
    return CouponRedemption.findById(id);
  }

  static getByUser(userId) {
    return CouponRedemption.find({ user_id: userId });
  }

  static getByCoupon(couponId) {
    return CouponRedemption.find({ coupon_id: couponId });
  }

  static update(id, data) {
    return CouponRedemption.findByIdAndUpdate(id, data, { new: true });
  }

  static delete(id) {
    return CouponRedemption.findByIdAndDelete(id);
  }
}

export default CouponRedemptionService;
