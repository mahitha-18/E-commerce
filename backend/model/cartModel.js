import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    vendor_outlet_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VendorOutlet",
      required: true,
    }
  },
  { timestamps: true }
);

// Unique constraint: one cart per user per vendor outlet
cartSchema.index({ user_id: 1, vendor_outlet_id: 1 }, { unique: true });

export default mongoose.model("Cart", cartSchema);
