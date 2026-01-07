import mongoose from "mongoose";

const { Schema, model } = mongoose;

const productImageSchema = new Schema(
  {
    product_id: {
      type: Schema.Types.ObjectId,
      ref: "products",
      required: true,
      // index: true,
    },

    variant_id: {
      type: Schema.Types.ObjectId,
      ref: "product_variants",
      default: null,
      // index: true,
    },

    image_url: {
      type: String,
      required: true,
      trim: true,
    },

    is_primary: {
      type: Boolean,
      default: false,
    },

    display_order: {
      type: Number,
      default: 0,
    },
  },
  {
    collection: "product_images",
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

// Only one primary image per product + variant
productImageSchema.index(
  { product_id: 1, variant_id: 1, is_primary: 1 },
  {
    unique: true,
    partialFilterExpression: { is_primary: true },
  }
);

export default model("product_images", productImageSchema);
