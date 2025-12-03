import Vendor from "../models/Vendor.js";

/* ---------------------------- CREATE VENDOR ----------------------------- */
export const createVendor = async (data) => {
  return await Vendor.create(data);
};

/* ----------------------------- GET VENDOR ------------------------------- */
export const getVendorById = async (id) => {
  return await Vendor.findById(id).populate("userId");
};

/* ------------------------- GET VENDOR BY USERID ------------------------ */
export const getVendorByUser = async (userId) => {
  return await Vendor.findOne({ userId }).populate("userId");
};

/* --------------------------- UPDATE VENDOR ------------------------------ */
export const updateVendor = async (id, data) => {
  return await Vendor.findByIdAndUpdate(id, data, { new: true });
};

/* --------------------------- DELETE VENDOR ------------------------------ */
export const deleteVendor = async (id) => {
  return await Vendor.findByIdAndDelete(id);
};

/* --------------------------- APPROVE VENDOR ----------------------------- */
export const approveVendor = async (id) => {
  return await Vendor.findByIdAndUpdate(
    id,
    { vendorStatus: "approved" },
    { new: true }
  );
};

/* ----------------------------- GETALL VENDORS ----------------------------- */
export const listVendors = async () => {
  return await Vendor.find().populate("userId");
};
