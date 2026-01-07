import mongoose from "mongoose";
import Product from "../model/productModel.js";

class ProductService {
  // CREATE PRODUCT
  async create(data) {
    const {
      store_id,
      category_id,
      subcategory_id,
      name,
      description,
      sku,
      base_price,
      image_url,
      // is_veg,
      // dietary_tags,
      is_active,
    } = data;

    if (
      !mongoose.Types.ObjectId.isValid(store_id) ||
      !mongoose.Types.ObjectId.isValid(category_id)
    ) {
      const error = new Error("Invalid store or category ID");
      error.status = 400;
      throw error;
    }

    const existingProduct = await Product.findOne({
      name: name.trim(),
      store_id,
    });

    if (existingProduct) {
      const error = new Error("Product already exists in this store");
      error.status = 409;
      throw error;
    }

    return await Product.create({
      store_id,
      category_id,
      subcategory_id: subcategory_id || null,
      name: name.trim(),
      description,
      sku,
      base_price,
      image_url,
      is_active,
    });
  }

  // GET ALL PRODUCTS
  async getAll() {
    const products = await Product.find().sort({ created_at: -1 });
    if (!products.length) {
      return [];
    }
    return products;
  }

  // GET PRODUCT BY ID
  async getById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error("Invalid product ID");
      error.status = 400;
      throw error;
    }

    const product = await Product.findById(id);
    if (!product) {
      const error = new Error("Product not found");
      error.status = 404;
      throw error;
    }

    return product;
  }

  // UPDATE PRODUCT
  async update(id, data) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error("Invalid product ID");
      error.status = 400;
      throw error;
    }

    const updated = await Product.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      const error = new Error("Product not found");
      error.status = 404;
      throw error;
    }

    return updated;
  }

  // DELETE PRODUCT
  async delete(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error("Invalid product ID");
      error.status = 400;
      throw error;
    }

    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      const error = new Error("Product not found");
      error.status = 404;
      throw error;
    }

    return deleted;
  }
}

export default new ProductService();
