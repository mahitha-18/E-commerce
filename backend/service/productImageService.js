import ProductImage from "../model/productIMageModel.js";

class ProductImageService {
  static async create(data) {
    return await ProductImage.create(data);
  }

  static async getAll(filter = {}) {
    return await ProductImage.find(filter).sort({ display_order: 1 });
  }

  static async getById(id) {
    return await ProductImage.findById(id);
  }

  static async update(id, data) {
    return await ProductImage.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );
  }

  static async delete(id) {
    return await ProductImage.findByIdAndDelete(id);
  }
}

export default ProductImageService;
