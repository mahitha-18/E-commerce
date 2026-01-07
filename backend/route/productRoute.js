import express from "express";
import upload from "../middleware/upload.js";
import ProductController from "../controller/productController.js";

const router = express.Router();

router.post(
  "/create",
  upload.array("product_image", 5),
  ProductController.create
);

router.get("/getall", ProductController.getAll);
router.get("/getby/:id", ProductController.getById);

router.put(
  "/update/:id",
  upload.array("product_image", 5),
  ProductController.update
);

router.delete("/delete/:id", ProductController.delete);

export default router;
