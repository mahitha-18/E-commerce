import ProductVariantService from "../service/productVariantService.js";

class ProductVariantController {
  static async create(req, res) {
    try {
      const variant = await ProductVariantService.createVariant(req.body);
      res.status(201).json({
        message: "Product variant created successfully",
        data: variant,
      });
    } catch (error) {
      res.status(400).json({
        message: "Failed to create product variant",
        error: error.message,
      });
    }
  }

  static async getAll(req, res) {
    try {
      const variants = await ProductVariantService.getAllVariants();
      res.status(200).json({
        message: "Product variants fetched successfully",
        data: variants,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch product variants",
        error: error.message,
      });
    }
  }

  static async getById(req, res) {
    try {
      const variant = await ProductVariantService.getVariantById(req.params.id);

      if (!variant) {
        return res.status(404).json({
          message: "Product variant not found",
        });
      }

      res.status(200).json({
        message: "Product variant fetched successfully",
        data: variant,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch product variant",
        error: error.message,
      });
    }
  }

  // static async getByOutletAndProduct(req, res) {
  //   try {
  //     const { vendor_outlet_id, product_id } = req.params;

  //     const variants =
  //       await ProductVariantService.getByOutletAndProduct(
  //         vendor_outlet_id,
  //         product_id
  //       );

  //     res.status(200).json({
  //       message: "Product variants fetched successfully",
  //       data: variants,
  //     });
  //   } catch (error) {
  //     res.status(500).json({
  //       message: "Failed to fetch product variants",
  //       error: error.message,
  //     });
  //   }
  // }

  static async update(req, res) {
    try {
      const variant = await ProductVariantService.updateVariant(
        req.params.id,
        req.body
      );

      if (!variant) {
        return res.status(404).json({
          message: "Product variant not found",
        });
      }

      res.status(200).json({
        message: "Product variant updated successfully",
        data: variant,
      });
    } catch (error) {
      res.status(400).json({
        message: "Failed to update product variant",
        error: error.message,
      });
    }
  }

  static async remove(req, res) {
    try {
      const variant = await ProductVariantService.deleteVariant(req.params.id);

      if (!variant) {
        return res.status(404).json({
          message: "Product variant not found",
        });
      }

      res.status(200).json({
        message: "Product variant deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to delete product variant",
        error: error.message,
      });
    }
  }
}

export default ProductVariantController;
