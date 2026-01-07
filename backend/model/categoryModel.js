import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      default: null,
      trim: true,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    image_url: {
      type: [String], // storing multiple image path URLs
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
