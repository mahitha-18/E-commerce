import mongoose from "mongoose";

const { Schema, model } = mongoose;

const orderSchema = new Schema(
  {
    order_number: {
      type: String,
      required: true,
      unique: true,
      // index: true,
    },

    user_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
      // index: true,
    },

    vendor_outlet_id: {
      type: Schema.Types.ObjectId,
      ref: "vendor_outlets",
      required: true,
      // index: true,
    },

    delivery_address_id: {
      type: Schema.Types.ObjectId,
      ref: "addresses",
      required: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "preparing",
        "out_for_delivery",
        "delivered",
        "cancelled",
      ],
      default: "pending",
      // index: true,
    },

    subtotal_amount: {
      type: Number,
      required: true,
    },

    delivery_fee: {
      type: Number,
      default: 0,
    },

    tax_amount: {
      type: Number,
      default: 0,
    },

    discount_amount: {
      type: Number,
      default: 0,
    },

    total_amount: {
      type: Number,
      required: true,
    },

    payment_status: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },

    coupon_id: {
      type: Schema.Types.ObjectId,
      ref: "coupons",
      default: null,
    },

    placed_at: {
      type: Date,
      default: Date.now,
    },

    expected_delivery_at: {
      type: Date,
      default: null,
    },

    delivered_at: {
      type: Date,
      default: null,
    },

    cancelled_at: {
      type: Date,
      default: null,
    },

    cancel_reason: {
      type: String,
      default: null,
    },

    metadata: {
      type: Schema.Types.Mixed,
      default: null,
    },
  },
  {
    collection: "orders",
    timestamps: true,
  }
);

// Indexes
// orderSchema.index({ user_id: 1 });
orderSchema.index({ vendor_outlet_id: 1 });
orderSchema.index({ status: 1 });

export default model("orders", orderSchema);
