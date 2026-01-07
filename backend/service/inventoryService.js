import Inventory from "../model/inventoryModel.js";

class InventoryService {
  static async create(data) {
    return await Inventory.create(data);
  }

  static async getAll() {
    return await Inventory.find().populate("variant_id");
  }

  static async getById(id) {
    return await Inventory.findById(id).populate("variant_id");
  }

  static async getByVariantId(variantId) {
    return await Inventory.findOne({ variant_id: variantId });
  }

  static async update(id, data) {
    return await Inventory.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  static async delete(id) {
    return await Inventory.findByIdAndDelete(id);
  }
}

export default InventoryService;
