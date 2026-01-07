import ProductImageService from "../service/productImageService.js";

class ProductImageController {
  // CREATE
  static async create(req, res) {
    try {
      const image = await ProductImageService.create(req.body);

      return res.status(201).json({
        message: "Product image created successfully",
        data: image,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error creating product image",
        error: error.message,
      });
    }
  }

  // READ ALL
  static async getAll(req, res) {
    try {
      const images = await ProductImageService.getAll(req.query);

      return res.json({
        message: "Product images fetched successfully",
        data: images,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error fetching product images",
        error: error.message,
      });
    }
  }

  // READ BY ID
  static async getById(req, res) {
    try {
      const image = await ProductImageService.getById(req.params.id);

      if (!image) {
        return res.status(404).json({
          message: "Product image not found",
        });
      }

      return res.json({
        message: "Product image fetched successfully",
        data: image,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error fetching product image",
        error: error.message,
      });
    }
  }

  // UPDATE
  static async update(req, res) {
    try {
      const image = await ProductImageService.update(
        req.params.id,
        req.body
      );

      if (!image) {
        return res.status(404).json({
          message: "Product image not found",
        });
      }

      return res.json({
        message: "Product image updated successfully",
        data: image,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error updating product image",
        error: error.message,
      });
    }
  }

  // DELETE
  static async delete(req, res) {
    try {
      const image = await ProductImageService.delete(req.params.id);

      if (!image) {
        return res.status(404).json({
          message: "Product image not found",
        });
      }

      return res.json({
        message: "Product image deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error deleting product image",
        error: error.message,
      });
    }
  }
}

export default ProductImageController;
