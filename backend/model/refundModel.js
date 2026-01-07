import mongoose from "mongoose";

const refundSchema = new mongoose.Schema(
  {
    payment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      required: true,
      unique: true
    },

    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true
    },

    gateway_refund_id: {
      type: String,
      trim: true,
      default: null
    },

    amount: {
      type: Number,
      required: true,
      min: 0
    },

    reason: {
      type: String,
      default: null
    },

    status: {
      type: String,
      enum: ["initiated", "processed", "failed"],
      default: "initiated"
    },

    processed_at: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: false }
  }
);

const Refund = mongoose.model("Refund", refundSchema);
export default Refund;
