import fs from "fs";
import mongoose from "mongoose";
import Subcategory from "../model/subcategoryModel.js";
import SubcategoryService from "../service/subcategoryService.js";

class SubcategoryController {
  // CREATE
  async create(req, res) {
    try {
      const { name, category_id, description, is_active } = req.body;

      if (!mongoose.Types.ObjectId.isValid(category_id)) {
        return res.status(400).json({ message: "Invalid category_id" });
      }

      const existing = await Subcategory.findOne({
        name: name.trim(),
        category_id,
      });

      if (existing) {
        return res.status(409).json({
          message: "Subcategory already exists under this category",
        });
      }

      // const imagePaths =
      //   req.files?.subcategory_images?.map((f) => f.path) || [];

      // ✅ CORRECT FILE EXTRACTION
      const imagePaths =
        req.files?.subcategory_images?.map(f => f.path) || [];

      // ✅ USE SERVICE (NOT MODEL)
      const subcategory = await SubcategoryService.create({
        name,
        category_id,
        description,
        is_active,
        imagePaths,
      });
      console.log(req.files.subcategory_images);

  //     const imagePaths = (req.files?.subcategory_images || [])
  // .map(f => f?.path)
  // .filter(Boolean);

  //     const subcategory = await Subcategory.create({
  //       name,
  //       category_id,
  //       description,
  //       is_active,
  //       image_url: imagePaths,
  //     });

      return res.status(201).json({
        message: "Subcategory created successfully",
        data: subcategory,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // GET ALL
  async getAll(req, res) {
    try {
      const data = await Subcategory.find().sort({ created_at: -1 });
      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // GET BY ID
  async getById(req, res) {
    try {
      const subcategory = await Subcategory.findById(req.params.id);
      if (!subcategory) {
        return res.status(404).json({ message: "Subcategory not found" });
      }
      return res.status(200).json({ data: subcategory });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // UPDATE (Replace Images)
  async update(req, res) {
    try {
      const subcategory = await Subcategory.findById(req.params.id);
      if (!subcategory) {
        return res.status(404).json({ message: "Subcategory not found" });
      }

      // Duplicate check
      if (req.body.name) {
        const duplicate = await Subcategory.findOne({
          _id: { $ne: req.params.id },
          name: req.body.name.trim(),
          category_id: subcategory.category_id,
        });

        if (duplicate) {
          return res.status(409).json({
            message: "Subcategory name already exists under this category",
          });
        }
      }

      // Replace images
      if (req.files?.subcategory_images?.length > 0) {
        // delete old images
        subcategory.image_url.forEach((img) => {
          if (fs.existsSync(img)) fs.unlinkSync(img);
        });

        // subcategory.image_url = req.files.subcategory_images.map(
        //   (f) => f.path
        // );
        subcategory.image_url = req.files.subcategory_images
          .map(f => f?.path)
          .filter(Boolean);
      }

      if (req.body.is_active !== undefined) {
        subcategory.is_active = req.body.is_active === "true";
      }

      subcategory.name = req.body.name ?? subcategory.name;
      subcategory.description =
        req.body.description ?? subcategory.description;

      await subcategory.save();

      return res.status(200).json({
        message: "Subcategory updated successfully",
        data: subcategory,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // DELETE
  async delete(req, res) {
    try {
      const subcategory = await Subcategory.findById(req.params.id);
      if (!subcategory) {
        return res.status(404).json({ message: "Subcategory not found" });
      }

      // delete images
      subcategory.image_url.forEach((img) => {
        if (fs.existsSync(img)) fs.unlinkSync(img);
      });

      await subcategory.deleteOne();

      return res.status(200).json({
        message: "Subcategory deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default new SubcategoryController();
