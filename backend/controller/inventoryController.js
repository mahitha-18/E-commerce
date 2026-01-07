import InventoryService from "../service/inventoryService.js";

class InventoryController {
  // CREATE
  static async create(req, res) {
    try {
      const inventory = await InventoryService.create(req.body);

      return res.status(201).json({
        message: "Inventory created successfully",
        data: inventory,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Failed to create inventory",
        error: error.message,
      });
    }
  }

  // GET ALL
  static async getAll(req, res) {
    try {
      const inventory = await InventoryService.getAll();

      return res.json({
        message: "Inventory fetched successfully",
        data: inventory,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to fetch inventory",
        error: error.message,
      });
    }
  }

  // GET BY ID
  static async getById(req, res) {
    try {
      const inventory = await InventoryService.getById(req.params.id);

      if (!inventory) {
        return res.status(404).json({ message: "Inventory not found" });
      }

      return res.json({
        message: "Inventory fetched successfully",
        data: inventory,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to fetch inventory",
        error: error.message,
      });
    }
  }

  // UPDATE
  static async update(req, res) {
    try {
      const inventory = await InventoryService.update(
        req.params.id,
        req.body
      );

      if (!inventory) {
        return res.status(404).json({ message: "Inventory not found" });
      }

      return res.json({
        message: "Inventory updated successfully",
        data: inventory,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Failed to update inventory",
        error: error.message,
      });
    }
  }

  // DELETE
  static async delete(req, res) {
    try {
      const inventory = await InventoryService.delete(req.params.id);

      if (!inventory) {
        return res.status(404).json({ message: "Inventory not found" });
      }

      return res.json({
        message: "Inventory deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to delete inventory",
        error: error.message,
      });
    }
  }
}

export default InventoryController;
