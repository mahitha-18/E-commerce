import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    shopName: { type: String, required: true },

    shopLogo: { type: String },

    gstNumber: { type: String },

    pickupAddress: {
      street: String,
      city: String,
      state: String,
      pincode: String,
    },

    bankDetails: {
      accountHolderName: String,
      accountNumber: String,
      ifscCode: String,
      bankName: String,
    },

    vendorStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Vendor", vendorSchema);
