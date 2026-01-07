import mongoose from "mongoose";

const vendorOutletSchema = new mongoose.Schema(
  {
    vendor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },

    address_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },

    name: {
      type: String,
      required: true,
      maxlength: 255,
      trim: true,
    },

    open_time: {
      type: String, // storing as "HH:MM:SS"
      default: null,
      trim: true,
    },

    close_time: {
      type: String, // storing as "HH:MM:SS"
      default: null,
      trim: true,
    },

    min_order_value: {
      type: Number,
      default: 0,
    },

    is_active: {
      type: Boolean,
      default: true,
    },

    delivery_radius_km: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("VendorOutlet", vendorOutletSchema);
