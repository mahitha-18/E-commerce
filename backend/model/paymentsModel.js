import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    payment_gateway: {
      type: String,
      required: true,
      trim: true,
    },

    gateway_payment_id: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    currency: {
      type: String,
      default: "INR",
    },

    status: {
      type: String,
      enum: ["initiated", "successful", "failed"],
      default: "initiated",
    },

    error_code: {
      type: String,
      default: null,
    },

    error_message: {
      type: String,
      default: null,
    },

    paid_at: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: false },
  }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
