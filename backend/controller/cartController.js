import CartService from "../service/cartService.js";
import Cart from "../model/cartModel.js";

class CartController {

  // CREATE
  async createCart(req, res) {
    try {
      const { user_id, vendor_outlet_id } = req.body;

      // Check existing cart for same user & vendor outlet
      const exists = await CartService.findByUserAndOutlet(user_id, vendor_outlet_id);
      if (exists) {
        return res
          .status(400)
          .json({ message: "Cart already exists for this user and vendor outlet" });
      }

      const cart = await CartService.create(req.body);
      return res
        .status(201)
        .json({ message: "Cart created successfully", data: cart });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Failed to create cart", error: error.message });
    }
  }

  // GET ALL
  async getCarts(req, res) {
    try {
      const carts = await CartService.findAll();
      return res.json({ message: "Carts retrieved", data: carts });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to retrieve carts", error: error.message });
    }
  }

  // GET BY ID
  async getCartById(req, res) {
    try {
      const cart = await CartService.findById(req.params.id);
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
      return res.json({ message: "Cart found", data: cart });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Invalid cart ID", error: error.message });
    }
  }

  // UPDATE
  async updateCart(req, res) {
    try {
      const cart = await CartService.findById(req.params.id);
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      const { user_id, vendor_outlet_id } = req.body;
      if (user_id && vendor_outlet_id) {
        const duplicate = await CartService.findByUserAndOutlet(user_id, vendor_outlet_id);
        if (duplicate && duplicate._id.toString() !== req.params.id) {
          return res
            .status(400)
            .json({ message: "Cart already exists for this user and vendor outlet" });
        }
      }

      const updated = await CartService.update(req.params.id, req.body);
      return res.json({ message: "Cart updated successfully", data: updated });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Failed to update cart", error: error.message });
    }
  }

  // DELETE
  async deleteCart(req, res) {
    try {
      const cart = await CartService.findById(req.params.id);
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      await CartService.delete(req.params.id);
      return res.json({ message: "Cart deleted successfully" });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Failed to delete cart", error: error.message });
    }
  }
}

export default new CartController();
