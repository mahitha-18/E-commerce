import Refund from "../model/refundModel.js";

class RefundService {
  // CREATE
  static async create(data) {
    const existingRefund = await Refund.findOne({
      payment_id: data.payment_id
    });

    if (existingRefund) {
      throw new Error("Refund already exists for this payment");
    }

    if (data.status === "processed") {
      data.processed_at = new Date();
    }

    return Refund.create(data);
  }

  // GET ALL
  static async getAll(filter = {}) {
    return Refund.find(filter).sort({ created_at: -1 });
  }

  // GET BY ID
  static async getById(id) {
    return Refund.findById(id);
  }

  // UPDATE
  static async update(id, data) {
    const refund = await Refund.findById(id);
    if (!refund) return null;

    if (data.status === "processed") {
      data.processed_at = new Date();
    }

    Object.assign(refund, data);
    await refund.save();
    return refund;
  }

  // DELETE
  static async delete(id) {
    return Refund.findByIdAndDelete(id);
  }
}

export default RefundService;
