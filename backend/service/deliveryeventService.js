import DeliveryEvent from "../model/deliveryeventModel.js";

class DeliveryEventService {
  // CREATE
  static async create(data) {
    return DeliveryEvent.create(data);
  }

  // GET ALL
  static async getAll(filter = {}) {
    return DeliveryEvent.find(filter).sort({ created_at: -1 });
  }

  // GET BY ID
  static async getById(id) {
    return DeliveryEvent.findById(id);
  }

  // UPDATE
  static async update(id, data) {
    const event = await DeliveryEvent.findById(id);
    if (!event) return null;

    Object.assign(event, data);
    await event.save();
    return event;
  }

  // DELETE
  static async delete(id) {
    return DeliveryEvent.findByIdAndDelete(id);
  }
}

export default DeliveryEventService;
