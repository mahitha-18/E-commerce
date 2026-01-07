import fs from "fs";
import path from "path";
import CategoryService from "../service/categoryService.js";

// Save uploaded memory files to disk under uploads/images/categories
const saveImagesToDisk = (files) => {
  const savedPaths = [];
  const dir = path.join(process.cwd(), "uploads", "images", "categories");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  files.forEach((file) => {
    const ext = path.extname(file.originalname) || "";
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
    const filepath = path.join(dir, filename);
    fs.writeFileSync(filepath, file.buffer);
    savedPaths.push(`/uploads/images/categories/${filename}`);
  });

  return savedPaths;
};

// Delete files from disk by path list
const deleteFilesFromDisk = (urls = []) => {
  urls.forEach((url) => {
    const filepath = path.join(process.cwd(), url);
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }
  });
};

class CategoryController {
  // CREATE
  async createCategory(req, res) {
    try {
      const { name, description, is_active } = req.body;

      const exists = await CategoryService.findByName(name);
      if (exists) {
        return res.status(400).json({ message: "Category already exists" });
      }

      const imagePaths = req.files ? saveImagesToDisk(req.files) : [];

      const category = await CategoryService.create({
        name,
        description,
        is_active: is_active ?? true,
        image_url: imagePaths,
      });

      return res.status(201).json({ message: "Category created", data: category });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Failed to create category", error: error.message });
    }
  }

  // READ ALL
  async getCategories(req, res) {
    try {
      const categories = await CategoryService.findAll();
      return res.json({ message: "Categories retrieved", data: categories });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to retrieve categories", error: error.message });
    }
  }

  // READ ONE
  async getCategoryById(req, res) {
    try {
      const category = await CategoryService.findById(req.params.id);
      if (!category) return res.status(404).json({ message: "Category not found" });
      return res.json({ message: "Category found", data: category });
    } catch (error) {
      return res.status(400).json({ message: "Invalid category ID", error: error.message });
    }
  }

  // UPDATE
  async updateCategory(req, res) {
    try {
      const category = await CategoryService.findById(req.params.id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      const { name, description, is_active } = req.body;

      if (name && name.trim() !== category.name) {
        const duplicate = await CategoryService.findByName(name);
        if (duplicate) {
          return res
            .status(400)
            .json({ message: "Category name already exists" });
        }
      }

      let imagePaths = category.image_url || [];

      if (req.files && req.files.length > 0) {
        deleteFilesFromDisk(imagePaths);
        imagePaths = saveImagesToDisk(req.files);
      }

      const updated = await CategoryService.update(req.params.id, {
        name: name ?? category.name,
        description: description ?? category.description,
        is_active: is_active ?? category.is_active,
        image_url: imagePaths,
      });

      return res.json({ message: "Category updated", data: updated });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Failed to update category", error: error.message });
    }
  }

  // DELETE
  async deleteCategory(req, res) {
    try {
      const category = await CategoryService.findById(req.params.id);
      if (!category) return res.status(404).json({ message: "Category not found" });

      deleteFilesFromDisk(category.image_url);

      await CategoryService.delete(req.params.id);
      return res.json({ message: "Category deleted successfully" });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Failed to delete category", error: error.message });
    }
  }
}

export default new CategoryController();
