import express from "express";
import ProductVariantController from "../controller/productvariantController.js";

const router = express.Router();

router.post("/create", ProductVariantController.create);
router.get("/getall", ProductVariantController.getAll);
router.get("/getby/:id", ProductVariantController.getById);
// router.get(
//   "/getby-outlet/:vendor_outlet_id/product/:product_id",
//   ProductVariantController.getByOutletAndProduct
// );
router.put("/update/:id", ProductVariantController.update);
router.delete("/delete/:id", ProductVariantController.remove);

export default router;
