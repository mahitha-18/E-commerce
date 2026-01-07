import DeliveryPartnerService from "../service/deliverypartnerService.js";

class DeliveryPartnerController {
  static async create(req, res) {
    try {
      const partner = await DeliveryPartnerService.create(req.body);
      res.status(201).json({
        message: "Delivery partner created successfully",
        data: partner
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getAll(req, res) {
    const data = await DeliveryPartnerService.getAll();
    res.json({ data });
  }

  static async getById(req, res) {
    const partner = await DeliveryPartnerService.getById(req.params.id);
    if (!partner) {
      return res.status(404).json({ message: "Delivery partner not found" });
    }
    res.json({ data: partner });
  }

  static async update(req, res) {
    const updated = await DeliveryPartnerService.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: "Delivery partner not found" });
    }
    res.json({
      message: "Delivery partner updated successfully",
      data: updated
    });
  }

  static async updateLocation(req, res) {
    const { latitude, longitude } = req.body;
    const updated = await DeliveryPartnerService.updateLocation(
      req.params.id,
      latitude,
      longitude
    );
    res.json({
      message: "Location updated successfully",
      data: updated
    });
  }

  static async delete(req, res) {
    const deleted = await DeliveryPartnerService.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Delivery partner not found" });
    }
    res.json({ message: "Delivery partner deleted successfully" });
  }
}

export default DeliveryPartnerController;
