import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    type: {
      type: String,
      required: true,
      maxlength: 50,
    },
    region_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Region",
      required: true,
    },
    address_lane1: {
      type: String,
      required: true,
      maxlength: 255,
    },
    address_lane2: {
      type: String,
      default: null,
      maxlength: 255,
    },
    city: {
      type: String,
      required: true,
      maxlength: 100,
    },
    state: {
      type: String,
      required: true,
      maxlength: 100,
    },
    postal_code: {
      type: String,
      required: true,
      maxlength: 20,
    },
    latitude: {
      type: Number,
      default: null,
    },
    longitude: {
      type: Number,
      default: null,
    },
    opening_time: {
      type: String,
      required: true,
    },
    closing_time: {
      type: String,
      required: true,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Store", storeSchema);
