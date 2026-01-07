import DeliveryAssignmentService from "../service/deliveryassignmentService.js";

class DeliveryAssignmentController {
  static async create(req, res) {
    try {
      const assignment = await DeliveryAssignmentService.create(req.body);
      return res.status(201).json({
        message: "Delivery assignment created successfully",
        data: assignment
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message
      });
    }
  }

  static async getAll(req, res) {
    try {
      const assignments = await DeliveryAssignmentService.getAll(req.query);
      return res.json({
        message: "Delivery assignments fetched successfully",
        data: assignments
      });
    } catch {
      return res.status(500).json({
        message: "Failed to fetch delivery assignments"
      });
    }
  }

  static async getById(req, res) {
    try {
      const assignment = await DeliveryAssignmentService.getById(
        req.params.id
      );

      if (!assignment) {
        return res.status(404).json({
          message: "Delivery assignment not found"
        });
      }

      return res.json({
        message: "Delivery assignment fetched successfully",
        data: assignment
      });
    } catch {
      return res.status(500).json({
        message: "Failed to fetch delivery assignment"
      });
    }
  }

  static async update(req, res) {
    try {
      const assignment = await DeliveryAssignmentService.update(
        req.params.id,
        req.body
      );

      if (!assignment) {
        return res.status(404).json({
          message: "Delivery assignment not found"
        });
      }

      return res.json({
        message: "Delivery assignment updated successfully",
        data: assignment
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message
      });
    }
  }

  static async delete(req, res) {
    try {
      const assignment = await DeliveryAssignmentService.delete(
        req.params.id
      );

      if (!assignment) {
        return res.status(404).json({
          message: "Delivery assignment not found"
        });
      }

      return res.json({
        message: "Delivery assignment deleted successfully"
      });
    } catch {
      return res.status(500).json({
        message: "Failed to delete delivery assignment"
      });
    }
  }
}

export default DeliveryAssignmentController;
