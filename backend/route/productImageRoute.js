import express from "express";
import ProductImageController from "../controller/productImageController.js";

const router = express.Router();

router.post("/create", ProductImageController.create);
router.get("/getall", ProductImageController.getAll);
router.get("/getby/:id", ProductImageController.getById);
router.put("/update/:id", ProductImageController.update);
router.delete("/delete/:id", ProductImageController.delete);

export default router;
