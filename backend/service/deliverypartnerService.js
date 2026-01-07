import DeliveryPartner from "../model/deliverypartnerModel.js";

class DeliveryPartnerService {
  static async create(data) {
    return DeliveryPartner.create(data);
  }

  static async getAll() {
    return DeliveryPartner.find();
  }

  static async getById(id) {
    return DeliveryPartner.findById(id);
  }

  static async update(id, data) {
    return DeliveryPartner.findByIdAndUpdate(id, data, { new: true });
  }

  static async delete(id) {
    return DeliveryPartner.findByIdAndDelete(id);
  }

  static async updateLocation(id, latitude, longitude) {
    return DeliveryPartner.findByIdAndUpdate(
      id,
      {
        current_latitude: latitude,
        current_longitude: longitude,
        last_location_updated_at: new Date()
      },
      { new: true }
    );
  }
}

export default DeliveryPartnerService;
