import OrderStatusHistoryService from "../service/orderstatushistoryService.js";

class OrderStatusHistoryController {
  static async create(req, res) {
    try {
      const history = await OrderStatusHistoryService.create(req.body);
      res.status(201).json({
        message: "Order status history recorded successfully",
        data: history,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getAll(req, res) {
    const history = await OrderStatusHistoryService.getAll();
    res.json({ data: history });
  }

  static async getById(req, res) {
    const history = await OrderStatusHistoryService.getById(req.params.id);
    if (!history) {
      return res
        .status(404)
        .json({ message: "Order status history not found" });
    }
    res.json({ data: history });
  }

  static async getByOrder(req, res) {
    const history = await OrderStatusHistoryService.getByOrder(
      req.params.orderId
    );
    res.json({ data: history });
  }

  static async delete(req, res) {
    const history = await OrderStatusHistoryService.delete(req.params.id);
    if (!history) {
      return res
        .status(404)
        .json({ message: "Order status history not found" });
    }
    res.json({ message: "Order status history deleted successfully" });
  }
}

export default OrderStatusHistoryController;
