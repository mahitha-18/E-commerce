// export default new VendorService();
import mongoose from "mongoose";
import User from "../model/userModel.js";
import Vendor from "../model/vendorModel.js";

class VendorService {

  async createVendor(data) {
    try {
      if (!mongoose.Types.ObjectId.isValid(data.owner_user_id)) {
    return { status: 400, message: "Invalid owner_user_id format" };
  }

  const user = await User.findById(data.owner_user_id);
  if (!user) {
    return { status: 400, message: "User not found for owner_user_id" };
  }
  
  data.is_active = data.is_active === true || data.is_active === "true";

      const vendor = await Vendor.create(data);
      return {
        status: 201,
        message: "Vendor created successfully",
        data: vendor,
      };
    } catch (error) {
      console.error("CREATE VENDOR ERROR:", error);
      return { status: 500, message: "Internal Server Error" };
    }
  }

  async getAllVendors() {
    try {
      const vendors = await Vendor
        .find()
        .populate("owner_user_id", "email phone_number");

      return {
        status: 200,
        message: "Vendors fetched successfully",
        data: vendors,
      };
    } catch (error) {
      console.error("GET ALL VENDORS ERROR:", error);
      return { status: 500, message: "Internal Server Error" };
    }
  }

  async getVendorById(id) {
    try {
      const vendor = await Vendor.findById(id).populate(
        "owner_user_id",
        "email phone_number"
      );

      if (!vendor) {
        return { status: 404, message: "Vendor not found", data: null };
      }

      return {
        status: 200,
        message: "Vendor fetched successfully",
        data: vendor,
      };
    } catch (error) {
      console.error("GET VENDOR BY ID ERROR:", error);
      return { status: 500, message: "Internal Server Error" };
    }
  }

  async getVendorsByOwner(ownerUserId) {
    try {
      const vendors = await Vendor.find({ owner_user_id: ownerUserId });

      return {
        status: 200,
        message: "Owner vendors fetched successfully",
        data: vendors,
      };
    } catch (error) {
      console.error("GET VENDORS BY OWNER ERROR:", error);
      return { status: 500, message: "Internal Server Error" };
    }
  }

  async updateVendor(id, data) {
    try {
      const vendor = await Vendor.findById(id);

      if (!vendor) {
        return { status: 404, message: "Vendor not found", data: null };
      }
let isModified = false;

    for (const key in data) {
      if (vendor[key]?.toString() !== data[key]?.toString()) {
        vendor[key] = data[key];
        isModified = true;
      }
    }

    if (!isModified) {
      return {
        status: 200,
        message: "No changes made to vendor",
        data: vendor,
      };
    }
      Object.assign(vendor, data);
      const updated = await vendor.save();

      return {
        status: 200,
        message: "Vendor updated successfully",
        data: updated,
      };
    } catch (error) {
      console.error("UPDATE VENDOR ERROR:", error);
      return { status: 500, message: "Internal Server Error" };
    }
  }

  async deleteVendor(id) {
    try {
      const vendor = await Vendor.findByIdAndDelete(id);

      if (!vendor) {
        return { status: 404, message: "Vendor not found" };
      }

      return {
        status: 200,
        message: "Vendor deleted successfully",
      };
    } catch (error) {
      console.error("DELETE VENDOR ERROR:", error);
      return { status: 500, message: "Internal Server Error" };
    }
  }
}

export default new VendorService();
