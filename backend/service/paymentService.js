import Payment from "../model/paymentsModel.js";

class PaymentService {
  // CREATE
  static async create(data) {
    if (data.status === "successful") {
      const existingSuccess = await Payment.findOne({
        order_id: data.order_id,
        status: "successful",
      });

      if (existingSuccess) {
        throw new Error("Payment already successful for this order");
      }

      data.paid_at = new Date();
    }

    return Payment.create(data);
  }

  // GET ALL
  static async getAll(filter = {}) {
    return Payment.find(filter).sort({ created_at: -1 });
  }

  // GET BY ID
  static async getById(id) {
    return Payment.findById(id);
  }

  // UPDATE
  static async update(id, data) {
    const payment = await Payment.findById(id);
    if (!payment) return null;

    if (data.status === "successful") {
      const existingSuccess = await Payment.findOne({
        order_id: payment.order_id,
        status: "successful",
        _id: { $ne: id },
      });

      if (existingSuccess) {
        throw new Error(
          "Another successful payment already exists for this order"
        );
      }

      data.paid_at = new Date();
    }

    Object.assign(payment, data);
    await payment.save();
    return payment;
  }

  // DELETE
  static async delete(id) {
    return Payment.findByIdAndDelete(id);
  }
}

export default PaymentService;
