// service/subcategoryService.js
import fs from "fs";
import mongoose from "mongoose";
import Subcategory from "../model/subcategoryModel.js";

class SubcategoryService {
  // CREATE
  async create({ name, category_id, description, is_active, imagePaths }) {
    if (!mongoose.Types.ObjectId.isValid(category_id)) {
      const error = new Error("Invalid category_id");
      error.status = 400;
      throw error;
    }

    // Check duplicate
    const existing = await Subcategory.findOne({ name: name.trim(), category_id });
    if (existing) {
      const error = new Error("Subcategory already exists under this category");
      error.status = 409;
      throw error;
    }

    const subcategory = await Subcategory.create({
      name: name.trim(),
      category_id,
      description,
      is_active,
      image_url: imagePaths,
    });

    return subcategory;
  }

  // GET ALL
  async getAll() {
    return await Subcategory.find().sort({ created_at: -1 });
  }

  // GET BY ID
  async getById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return await Subcategory.findById(id);
  }

  // UPDATE
  async update(id, { name, description, is_active, newImagePaths }) {
    const subcategory = await Subcategory.findById(id);
    if (!subcategory) {
      const error = new Error("Subcategory not found");
      error.status = 404;
      throw error;
    }

    // Duplicate name check
    if (name) {
      const duplicate = await Subcategory.findOne({
        _id: { $ne: id },
        name: name.trim(),
        category_id: subcategory.category_id,
      });

      if (duplicate) {
        const error = new Error("Subcategory name already exists under this category");
        error.status = 409;
        throw error;
      }
    }

    // Replace images if new ones provided
    if (newImagePaths?.length > 0) {
      subcategory.image_url.forEach((img) => {
        if (fs.existsSync(img)) fs.unlinkSync(img);
      });
      subcategory.image_url = newImagePaths;
    }

    if (is_active !== undefined) subcategory.is_active = is_active === "true";
    if (name) subcategory.name = name.trim();
    if (description !== undefined) subcategory.description = description;

    await subcategory.save();
    return subcategory;
  }

  // DELETE
  async delete(id) {
    const subcategory = await Subcategory.findById(id);
    if (!subcategory) {
      const error = new Error("Subcategory not found");
      error.status = 404;
      throw error;
    }

    // Delete images
    subcategory.image_url.forEach((img) => {
      if (fs.existsSync(img)) fs.unlinkSync(img);
    });

    await subcategory.deleteOne();
    return true;
  }
}

export default new SubcategoryService();
