import CartItemService from "../service/cartitemService.js";

class CartItemController {
  // CREATE
  static async create(req, res) {
    try {
      const cartItem = await CartItemService.create(req.body);

      return res.status(201).json({
        message: "Item added to cart successfully",
        data: cartItem,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Failed to add item to cart",
        error: error.message,
      });
    }
  }

  // GET ALL
  static async getAll(req, res) {
    try {
      const items = await CartItemService.getAll();

      return res.json({
        message: "Cart items fetched successfully",
        data: items,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to fetch cart items",
        error: error.message,
      });
    }
  }

  // GET BY ID
  static async getById(req, res) {
    try {
      const item = await CartItemService.getById(req.params.id);

      if (!item) {
        return res.status(404).json({ message: "Cart item not found" });
      }

      return res.json({
        message: "Cart item fetched successfully",
        data: item,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to fetch cart item",
        error: error.message,
      });
    }
  }

  // GET BY CART ID
  static async getByCartId(req, res) {
    try {
      const items = await CartItemService.getByCartId(req.params.cartId);

      return res.json({
        message: "Cart items fetched successfully",
        data: items,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to fetch cart items",
        error: error.message,
      });
    }
  }

  // UPDATE
  static async update(req, res) {
    try {
      const item = await CartItemService.update(
        req.params.id,
        req.body
      );

      if (!item) {
        return res.status(404).json({ message: "Cart item not found" });
      }

      return res.json({
        message: "Cart item updated successfully",
        data: item,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Failed to update cart item",
        error: error.message,
      });
    }
  }

  // DELETE
  static async delete(req, res) {
    try {
      const item = await CartItemService.delete(req.params.id);

      if (!item) {
        return res.status(404).json({ message: "Cart item not found" });
      }

      return res.json({
        message: "Cart item removed successfully",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to delete cart item",
        error: error.message,
      });
    }
  }
}

export default CartItemController;
