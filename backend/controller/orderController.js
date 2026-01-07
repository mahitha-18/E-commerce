import OrderService from "../service/orderService.js";

class OrderController {
  // CREATE
  static async create(req, res) {
    try {
      const order = await OrderService.create(req.body);

      return res.status(201).json({
        message: "Order placed successfully",
        data: order,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error creating order",
        error: error.message,
      });
    }
  }

  // READ ALL
  static async getAll(req, res) {
    try {
      const orders = await OrderService.getAll(req.query);

      return res.json({
        message: "Orders fetched successfully",
        data: orders,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error fetching orders",
        error: error.message,
      });
    }
  }

  // READ BY ID
  static async getById(req, res) {
    try {
      const order = await OrderService.getById(req.params.id);

      if (!order) {
        return res.status(404).json({
          message: "Order not found",
        });
      }

      return res.json({
        message: "Order fetched successfully",
        data: order,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error fetching order",
        error: error.message,
      });
    }
  }

  // UPDATE
  static async update(req, res) {
    try {
      const order = await OrderService.update(
        req.params.id,
        req.body
      );

      if (!order) {
        return res.status(404).json({
          message: "Order not found",
        });
      }

      return res.json({
        message: "Order updated successfully",
        data: order,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error updating order",
        error: error.message,
      });
    }
  }

  // DELETE
  static async delete(req, res) {
    try {
      const order = await OrderService.delete(req.params.id);

      if (!order) {
        return res.status(404).json({
          message: "Order not found",
        });
      }

      return res.json({
        message: "Order deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error deleting order",
        error: error.message,
      });
    }
  }
}

export default OrderController;
