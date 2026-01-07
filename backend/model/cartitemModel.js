import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    cart_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },

    variant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductVariant",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    unit_price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // created_at & updated_at
  }
);

// Prevent duplicate variant in same cart
cartItemSchema.index({ cart_id: 1, variant_id: 1 }, { unique: true });

export default mongoose.model("CartItem", cartItemSchema);
