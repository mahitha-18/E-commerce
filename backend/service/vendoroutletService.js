import VendorOutlet from "../model/vendoroutletModel.js";

class VendorOutletService {
  async create(data) {
    const outlet = await VendorOutlet.create(data);
    return outlet;
  }

  async findAll() {
    const outlets = await VendorOutlet.find().sort({ createdAt: -1 });
    return outlets;
  }

  async findById(id) {
    const outlet = await VendorOutlet.findById(id);
    return outlet;
  }

  async update(id, data) {
    const outlet = await VendorOutlet.findByIdAndUpdate(id, data, { new: true });
    return outlet;
  }

  async delete(id) {
    const outlet = await VendorOutlet.findByIdAndDelete(id);
    return outlet;
  }
}

export default new VendorOutletService();
