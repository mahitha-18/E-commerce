import CartItem from "../model/cartitemModel.js";

class CartItemService {
  static async create(data) {
    return await CartItem.create(data);
  }

  static async getAll() {
    return await CartItem.find()
      .populate("cart_id")
      .populate("variant_id");
  }

  static async getById(id) {
    return await CartItem.findById(id)
      .populate("cart_id")
      .populate("variant_id");
  }

  static async getByCartId(cartId) {
    return await CartItem.find({ cart_id: cartId })
      .populate("variant_id");
  }

  static async update(id, data) {
    return await CartItem.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  static async delete(id) {
    return await CartItem.findByIdAndDelete(id);
  }

  static async deleteByCartId(cartId) {
    return await CartItem.deleteMany({ cart_id: cartId });
  }
}

export default CartItemService;
