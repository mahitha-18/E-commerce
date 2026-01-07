import express from "express";
import upload from "../middleware/upload.js";
import categoryController from "../controller/categoryController.js";

const router = express.Router();

// CREATE (multiple images)
router.post(
  "/create",
  upload.array("image", 5),
  categoryController.createCategory
);

// READ ALL
router.get("/getall", categoryController.getCategories);

// READ ONE
router.get("/getby/:id", categoryController.getCategoryById);

// UPDATE (optional new images)
router.put(
  "/update/:id",
  upload.array("image", 5),
  categoryController.updateCategory
);

// DELETE
router.delete("/delete/:id", categoryController.deleteCategory);

export default router;
