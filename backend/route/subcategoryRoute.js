import express from "express";
import upload from "../middleware/upload.js";
import SubcategoryController from "../controller/subcategoryController.js";

const router = express.Router();

router.post(
  "/create",
  upload.fields([{ name: "subcategory_images", maxCount: 5 }]),
  SubcategoryController.create
);

router.get("/getall", SubcategoryController.getAll);
router.get("/getby/:id", SubcategoryController.getById);

router.put(
  "/update/:id",
  upload.fields([{ name: "subcategory_images", maxCount: 5 }]),
  SubcategoryController.update
);

router.delete("/delete/:id", SubcategoryController.delete);

export default router;
