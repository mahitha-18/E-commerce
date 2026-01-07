import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    variant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductVariant",
      required: true,
      unique: true, // one inventory record per variant
    },

    current_stock: {
      type: Number,
      default: null, // null = unlimited / not tracked
    },

    reorder_level: {
      type: Number,
      default: null,
    },

    is_in_stock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: { updatedAt: "updated_at", createdAt: false },
  }
);

export default mongoose.model("Inventory", inventorySchema);
