import DeliveryAssignment from "../model/deliveryassignmentModel.js";

class DeliveryAssignmentService {
  // CREATE
  static async create(data) {
    const existing = await DeliveryAssignment.findOne({
      order_id: data.order_id
    });

    if (existing) {
      throw new Error("Delivery assignment already exists for this order");
    }

    return DeliveryAssignment.create(data);
  }

  // GET ALL
  static async getAll(filter = {}) {
    return DeliveryAssignment.find(filter);
  }

  // GET BY ID
  static async getById(id) {
    return DeliveryAssignment.findById(id);
  }

  // UPDATE
  static async update(id, data) {
    const assignment = await DeliveryAssignment.findById(id);
    if (!assignment) return null;

    Object.assign(assignment, data);
    await assignment.save();
    return assignment;
  }

  // DELETE
  static async delete(id) {
    return DeliveryAssignment.findByIdAndDelete(id);
  }
}

export default DeliveryAssignmentService;
