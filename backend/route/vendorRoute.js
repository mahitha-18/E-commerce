import express from "express";
import multer from "multer";
import upload from "../middleware/upload.js";
import VendorController from "../controller/vendorController.js";

const router = express.Router();

// CREATE VENDOR
// router.post("/create", VendorController.create);
// router.post(
//   "/create",
//   upload.single("logo_url"),
//   VendorController.create
// );
router.post(
  "/create",
  upload.fields([{ name: "logo_url", maxCount: 2 }]),
  VendorController.create
);
// GET ALL VENDORS
router.get("/getall", VendorController.getAll);

// GET VENDOR BY ID
router.get("/getby/:id", VendorController.getById);

// GET VENDORS BY OWNER
router.get("/owner/:ownerUserId", VendorController.getByOwner);

// UPDATE VENDOR
// router.put("/update/:id", VendorController.update);
router.put(
  "/update/:id",
  upload.fields([{ name: "logo_url", maxCount: 4 }]),
  VendorController.update
);
// DELETE VENDOR
router.delete("/delete/:id", VendorController.delete);

export default router;
