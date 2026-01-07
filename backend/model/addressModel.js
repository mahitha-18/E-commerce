import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    label: {
      type: String,
      required: true,
      maxlength: 50,
    },

    line1: {
      type: String,
      required: true,
      maxlength: 255,
    },

    line2: {
      type: String,
      maxlength: 255,
      default: null,
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

    country: {
      type: String,
      required: true,
      maxlength: 100,
    },

    latitude: {
      type: Number,
      default: null,
    },

    longitude: {
      type: Number,
      default: null,
    },

    is_default: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Address", addressSchema);
