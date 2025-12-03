import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        vendorId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Vendor",
        },
        quantity: Number,
        price: Number,
      },
    ],

    totalAmount: { type: Number, required: true },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    orderStatus: {
      type: String,
      enum: ["pending", "packed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },

    shippingAddress: {
      street: String,
      city: String,
      state: String,
      pincode: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
