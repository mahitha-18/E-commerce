import FavoriteService from "../service/favouriteService.js";

class FavoriteController {
  static async create(req, res) {
    try {
      const { user_id, vendor_id, product_id } = req.body;

      /* 🔴 RULE 1: At least one must exist */
      if (!vendor_id && !product_id) {
        return res.status(400).json({
          message: "Either vendor_id or product_id must be provided"
        });
      }

      /* 🔴 RULE 2: Prevent duplicates */
      const existing = await FavoriteService.findOne({
        user_id,
        vendor_id: vendor_id || null,
        product_id: product_id || null
      });

      if (existing) {
        return res.status(409).json({
          message: "Item already exists in favorites"
        });
      }

      const favorite = await FavoriteService.create({
        user_id,
        vendor_id: vendor_id || null,
        product_id: product_id || null
      });

      res.status(201).json({
        message: "Added to favorites successfully",
        data: favorite
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getAll(req, res) {
    const favorites = await FavoriteService.findAll();
    res.json({ data: favorites });
  }

  static async getById(req, res) {
    const favorite = await FavoriteService.findById(req.params.id);
    if (!favorite) {
      return res.status(404).json({ message: "Favorite not found" });
    }
    res.json({ data: favorite });
  }

  static async update(req, res) {
    try {
      const { vendor_id, product_id } = req.body;

      /* 🔴 RULE: At least one must exist */
      if (vendor_id === null && product_id === null) {
        return res.status(400).json({
          message: "Either vendor_id or product_id must be provided"
        });
      }

      const favorite = await FavoriteService.update(
        req.params.id,
        req.body
      );

      if (!favorite) {
        return res.status(404).json({ message: "Favorite not found" });
      }

      res.json({
        message: "Favorite updated successfully",
        data: favorite
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async delete(req, res) {
    const favorite = await FavoriteService.delete(req.params.id);
    if (!favorite) {
      return res.status(404).json({ message: "Favorite not found" });
    }
    res.json({
      message: "Removed from favorites successfully"
    });
  }
}

export default FavoriteController;
