import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema(
  {
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: null,
    },

    is_active: {
      type: Boolean,
      default: true,
    },

    image_url: {
      type: [String], // multi-image support
      default: [],
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

/**
 * Prevent duplicate subcategory names under same category
 */
subcategorySchema.index(
  { name: 1, category_id: 1 },
  { unique: true }
);

export default mongoose.model("Subcategory", subcategorySchema);
