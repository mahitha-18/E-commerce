import PaymentService from "../service/paymentService.js";

class PaymentController {
  static async create(req, res) {
    try {
      const payment = await PaymentService.create(req.body);
      return res.status(201).json({
        message: "Payment created successfully",
        data: payment,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  static async getAll(req, res) {
    try {
      const payments = await PaymentService.getAll(req.query);
      return res.json({
        message: "Payments fetched successfully",
        data: payments,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to fetch payments",
      });
    }
  }

  static async getById(req, res) {
    try {
      const payment = await PaymentService.getById(req.params.id);
      if (!payment) {
        return res.status(404).json({
          message: "Payment not found",
        });
      }

      return res.json({
        message: "Payment fetched successfully",
        data: payment,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to fetch payment",
      });
    }
  }

  static async update(req, res) {
    try {
      const payment = await PaymentService.update(
        req.params.id,
        req.body
      );

      if (!payment) {
        return res.status(404).json({
          message: "Payment not found",
        });
      }

      return res.json({
        message: "Payment updated successfully",
        data: payment,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  static async delete(req, res) {
    try {
      const payment = await PaymentService.delete(req.params.id);
      if (!payment) {
        return res.status(404).json({
          message: "Payment not found",
        });
      }

      return res.json({
        message: "Payment deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to delete payment",
      });
    }
  }
}

export default PaymentController;
