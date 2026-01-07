import Order from "../model/orderModel.js";

class OrderService {
  static async create(data) {
    return await Order.create(data);
  }

  static async getAll(filter = {}) {
    return await Order.find(filter)
      .sort({ placed_at: -1 });
  }

  static async getById(id) {
    return await Order.findById(id);
  }

  static async update(id, data) {
    return await Order.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );
  }

  static async delete(id) {
    return await Order.findByIdAndDelete(id);
  }
}

export default OrderService;
