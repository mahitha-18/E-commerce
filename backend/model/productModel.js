import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    store_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },

    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    subcategory_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
      default: null,
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

    sku: {
      type: String,
      default: null,
      unique: true,
      sparse: true,
    },

    base_price: {
      type: Number,
      required: true,
      min: 0,
    },

    image_url: {
      type: [String],
      default: null,
    },

    is_active: {
      type: Boolean,
      default: true,
    },

    approval_status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

// Prevent duplicate product names per store
productSchema.index({ name: 1, store_id: 1 }, { unique: true });

export default mongoose.model("Product", productSchema);
