import express from "express";
import vendoroutletController from "../controller/vendoroutletController.js";

const router = express.Router();

// CREATE
router.post("/create", vendoroutletController.createVendorOutlet);

// READ ALL
router.get("/getall", vendoroutletController.getVendorOutlets);

// READ ONE
router.get("/getby/:id", vendoroutletController.getVendorOutletById);

// UPDATE
router.put("/update/:id", vendoroutletController.updateVendorOutlet);

// DELETE
router.delete("/delete/:id", vendoroutletController.deleteVendorOutlet);

export default router;
