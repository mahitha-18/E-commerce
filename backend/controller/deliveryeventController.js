import DeliveryEventService from "../service/deliveryeventService.js";

class DeliveryEventController {
  static async create(req, res) {
    try {
      const event = await DeliveryEventService.create(req.body);
      return res.status(201).json({
        message: "Delivery event created successfully",
        data: event
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message
      });
    }
  }

  static async getAll(req, res) {
    try {
      const events = await DeliveryEventService.getAll(req.query);
      return res.json({
        message: "Delivery events fetched successfully",
        data: events
      });
    } catch {
      return res.status(500).json({
        message: "Failed to fetch delivery events"
      });
    }
  }

  static async getById(req, res) {
    try {
      const event = await DeliveryEventService.getById(req.params.id);
      if (!event) {
        return res.status(404).json({
          message: "Delivery event not found"
        });
      }

      return res.json({
        message: "Delivery event fetched successfully",
        data: event
      });
    } catch {
      return res.status(500).json({
        message: "Failed to fetch delivery event"
      });
    }
  }

  static async update(req, res) {
    try {
      const event = await DeliveryEventService.update(
        req.params.id,
        req.body
      );

      if (!event) {
        return res.status(404).json({
          message: "Delivery event not found"
        });
      }

      return res.json({
        message: "Delivery event updated successfully",
        data: event
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message
      });
    }
  }

  static async delete(req, res) {
    try {
      const event = await DeliveryEventService.delete(req.params.id);
      if (!event) {
        return res.status(404).json({
          message: "Delivery event not found"
        });
      }

      return res.json({
        message: "Delivery event deleted successfully"
      });
    } catch {
      return res.status(500).json({
        message: "Failed to delete delivery event"
      });
    }
  }
}

export default DeliveryEventController;
