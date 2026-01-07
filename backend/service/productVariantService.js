import ProductVariant from "../model/productvariantModel.js";

class ProductVariantService {
  static async createVariant(data) {
    const exists = await ProductVariant.findOne({
      vendor_outlet_id: data.vendor_outlet_id,
      sku: data.sku,
    });

    if (exists) {
      throw new Error("SKU already exists for this outlet");
    }

    return await ProductVariant.create(data);
  }

  static async getAllVariants() {
    return await ProductVariant.find();
  }

  static async getVariantById(id) {
    return await ProductVariant.findById(id);
  }

  static async getByOutletAndProduct(vendor_outlet_id, product_id) {
    return await ProductVariant.find({
      vendor_outlet_id,
      product_id,
    });
  }

  static async updateVariant(id, data) {
    if (data.sku && data.vendor_outlet_id) {
      const duplicate = await ProductVariant.findOne({
        vendor_outlet_id: data.vendor_outlet_id,
        sku: data.sku,
        _id: { $ne: id },
      });

      if (duplicate) {
        throw new Error("Another variant with this SKU already exists");
      }
    }

    return await ProductVariant.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  static async deleteVariant(id) {
    return await ProductVariant.findByIdAndDelete(id);
  }
}

export default ProductVariantService;
