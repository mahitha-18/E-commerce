import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    owner_user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    name: {
      type: String,
      required: true,
      maxlength: 255,
      trim: true
    },

    description: {
      type: String,
      default: null
    },

    type: {
      type: String,
      enum: ["restaurant", "grocery", "mixed"],
      required: true
    },

    logo_url: {
      type: [String],
      default: []
    },

    is_active: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Vendor", vendorSchema);
