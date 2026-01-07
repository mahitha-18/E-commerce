
import fs from "fs";
import path from "path";
import vendorService from "../service/vendorService.js";
import Vendor from "../model/vendorModel.js";

class VendorController {

  async create(req, res) {
    try {
      // Convert boolean
      if (req.body.is_active !== undefined) {
        req.body.is_active = req.body.is_active === "true";
      }


       const uploadDir = "uploads/vendors";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
      // ✅ Handle logo
    if (req.files?.logo_url?.length) {
      const file = req.files.logo_url[0];
      const filename = `${Date.now()}-${file.originalname}`;
      const filepath = path.join(uploadDir, filename);

      fs.writeFileSync(filepath, file.buffer);
      req.body.logo_url = filepath;
    }

      const result = await vendorService.createVendor(req.body);
      return res.status(result.status).json(result);

    } catch (err) {
      console.error("CREATE CONTROLLER ERROR:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getAll(req, res) {
    try {
      const result = await vendorService.getAllVendors();
      return res.status(result.status).json(result);
    } catch (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getById(req, res) {
    try {
      const result = await vendorService.getVendorById(req.params.id);
      return res.status(result.status).json(result);
    } catch (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getByOwner(req, res) {
    try {
      const { ownerUserId } = req.params;
      const result = await vendorService.getVendorsByOwner(ownerUserId);
      return res.status(result.status).json(result);
    } catch (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

async update(req, res) {
  try {
    // Convert boolean
    if (req.body.is_active !== undefined) {
      req.body.is_active = req.body.is_active === "true";
    }

    // Find vendor
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ status: 404, message: "Vendor not found" });
    }

    const uploadDir = "uploads/vendors";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // -------- LOGO UPLOAD FIX START --------
    if (req.files && req.files.logo_url && req.files.logo_url.length > 0) {

      // Delete old logos safely
      if (Array.isArray(vendor.logo_url)) {
        vendor.logo_url.forEach(filePath => {
          try {
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
          } catch (err) {
            console.error("Failed to delete old file:", filePath, err.message);
          }
        });
      }

      const newFiles = [];

      for (const file of req.files.logo_url) {
        const filename = `${Date.now()}-${file.originalname}`;
        const filepath = path.join(uploadDir, filename);
        fs.writeFileSync(filepath, file.buffer);
        newFiles.push(filepath);
      }

      // ✅ ALWAYS ARRAY (even for single file)
      req.body.logo_url = newFiles;

    } else {
      // 🚫 CRITICAL: never send empty array or "[]"
      delete req.body.logo_url;
    }
    // -------- LOGO UPLOAD FIX END --------

    // Prevent empty update
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        status: 400,
        message: "No fields provided for update"
      });
    }

    // Update timestamp
    req.body.updated_at = Date.now();

    const result = await vendorService.updateVendor(req.params.id, req.body);
    return res.status(result.status).json(result);

  } catch (err) {
    console.error("UPDATE VENDOR ERROR:", err);
    return res.status(500).json({ message: err.message });
  }
}

  async delete(req, res) {
    try {
      const result = await vendorService.deleteVendor(req.params.id);
      return res.status(result.status).json(result);
    } catch (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default new VendorController();
