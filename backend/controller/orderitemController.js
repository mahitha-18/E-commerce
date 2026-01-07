import OrderItemService from "../service/orderitemService.js";

class OrderItemController {
  static async create(req, res) {
    try {
      const item = await OrderItemService.create(req.body);
      res.status(201).json({
        message: "Order item created successfully",
        data: item,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getAll(req, res) {
    const items = await OrderItemService.getAll();
    res.json({ data: items });
  }

  static async getById(req, res) {
    const item = await OrderItemService.getById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Order item not found" });
    }
    res.json({ data: item });
  }

  static async getByOrder(req, res) {
    const items = await OrderItemService.getByOrder(req.params.orderId);
    res.json({ data: items });
  }

  static async update(req, res) {
    const item = await OrderItemService.update(req.params.id, req.body);
    if (!item) {
      return res.status(404).json({ message: "Order item not found" });
    }
    res.json({
      message: "Order item updated successfully",
      data: item,
    });
  }

  static async delete(req, res) {
    const item = await OrderItemService.delete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Order item not found" });
    }
    res.json({ message: "Order item deleted successfully" });
  }
}

export default OrderItemController;
