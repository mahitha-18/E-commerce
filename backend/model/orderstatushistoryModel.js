import mongoose from "mongoose";

const orderStatusHistorySchema = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      // index: true,
    },
    old_status: {
      type: String,
      default: null,
    },
    new_status: {
      type: String,
      required: true,
      // index: true,
    },
    changed_by_user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    notes: {
      type: String,
      default: null,
    },
    changed_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false, // we already store changed_at
  }
);

export default mongoose.model(
  "OrderStatusHistory",
  orderStatusHistorySchema
);
