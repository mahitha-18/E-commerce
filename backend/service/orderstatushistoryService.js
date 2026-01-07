import OrderStatusHistory from "../model/orderstatushistoryModel.js";

class OrderStatusHistoryService {
  static create(data) {
    return OrderStatusHistory.create(data);
  }

  static getAll() {
    return OrderStatusHistory.find().sort({ changed_at: -1 });
  }

  static getById(id) {
    return OrderStatusHistory.findById(id);
  }

  static getByOrder(orderId) {
    return OrderStatusHistory.find({ order_id: orderId }).sort({
      changed_at: 1,
    });
  }

  static delete(id) {
    return OrderStatusHistory.findByIdAndDelete(id);
  }
}

export default OrderStatusHistoryService;
