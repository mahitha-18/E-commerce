import Cart from "../model/cartModel.js";

class CartService {
  async create(data) {
    return Cart.create(data);
  }

  async findAll() {
    return Cart.find().sort({ createdAt: -1 });
  }

  async findById(id) {
    return Cart.findById(id);
  }

  async findByUserAndOutlet(user_id, vendor_outlet_id) {
    return Cart.findOne({ user_id, vendor_outlet_id });
  }

  async update(id, data) {
    return Cart.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return Cart.findByIdAndDelete(id);
  }
}

export default new CartService();
