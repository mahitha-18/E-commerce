import RefundService from "../service/refundService.js";

class RefundController {
  static async create(req, res) {
    try {
      const refund = await RefundService.create(req.body);
      return res.status(201).json({
        message: "Refund created successfully",
        data: refund
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message
      });
    }
  }

  static async getAll(req, res) {
    try {
      const refunds = await RefundService.getAll(req.query);
      return res.json({
        message: "Refunds fetched successfully",
        data: refunds
      });
    } catch {
      return res.status(500).json({
        message: "Failed to fetch refunds"
      });
    }
  }

  static async getById(req, res) {
    try {
      const refund = await RefundService.getById(req.params.id);
      if (!refund) {
        return res.status(404).json({ message: "Refund not found" });
      }

      return res.json({
        message: "Refund fetched successfully",
        data: refund
      });
    } catch {
      return res.status(500).json({
        message: "Failed to fetch refund"
      });
    }
  }

  static async update(req, res) {
    try {
      const refund = await RefundService.update(
        req.params.id,
        req.body
      );

      if (!refund) {
        return res.status(404).json({ message: "Refund not found" });
      }

      return res.json({
        message: "Refund updated successfully",
        data: refund
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message
      });
    }
  }

  static async delete(req, res) {
    try {
      const refund = await RefundService.delete(req.params.id);
      if (!refund) {
        return res.status(404).json({ message: "Refund not found" });
      }

      return res.json({
        message: "Refund deleted successfully"
      });
    } catch {
      return res.status(500).json({
        message: "Failed to delete refund"
      });
    }
  }
}

export default RefundController;
