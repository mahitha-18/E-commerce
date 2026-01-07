import OrderItem from "../model/orderitemModel.js";

class OrderItemService {
  static create(data) {
    return OrderItem.create(data);
  }

  static getAll() {
    return OrderItem.find();
  }

  static getById(id) {
    return OrderItem.findById(id);
  }

  static getByOrder(orderId) {
    return OrderItem.find({ order_id: orderId });
  }

  static update(id, data) {
    return OrderItem.findByIdAndUpdate(id, data, { new: true });
  }

  static delete(id) {
    return OrderItem.findByIdAndDelete(id);
  }
}

export default OrderItemService;
