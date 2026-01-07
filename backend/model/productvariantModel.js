import mongoose from "mongoose";

const productVariantSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    vendor_outlet_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VendorOutlet",
      required: true,
    },

    sku: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    title: {
      type: String,
      required: true,
      maxlength: 150,
    },

    unit: {
      type: String,
      required: true,
      maxlength: 50,
    },

    quantity_value: {
      type: Number,
      default: null,
    },

    price: {
      type: Number,
      required: true,
    },

    mrp: {
      type: Number,
      default: null,
    },

    is_available: {
      type: Boolean,
      default: true,
    },

    max_order_quantity: {
      type: Number,
      default: null,
    },

    prep_time_minutes: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

/* ❌ Prevent duplicates */
productVariantSchema.index(
  { vendor_outlet_id: 1, sku: 1 },
  { unique: true }
);

/* ⚡ Performance index */
productVariantSchema.index({
  vendor_outlet_id: 1,
  product_id: 1,
});

export default mongoose.model("ProductVariant", productVariantSchema);
