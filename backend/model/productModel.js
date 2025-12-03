import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },

    name: { type: String, required: true },

    description: { type: String },

    price: { type: Number, required: true },

    stock: { type: Number, required: true },

    category: { type: String, required: true },

    brand: { type: String },

    images: [{ type: String }],

    attributes: {
      size: { type: String },
      color: { type: String },
      weight: { type: String },
    },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
