import mongoose from "mongoose";

const { Schema, model } = mongoose;

const couponSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      // unique: true,
      uppercase: true,
      trim: true,
      // index: true,
    },

    description: {
      type: String,
      default: null,
    },

    discount_type: {
      type: String,
      enum: ["flat", "percentage"],
      required: true,
    },

    discount_value: {
      type: Number,
      required: true,
    },

    max_discount_amount: {
      type: Number,
      default: null,
    },

    min_order_amount: {
      type: Number,
      default: null,
    },

    valid_from: {
      type: Date,
      required: true,
    },

    valid_to: {
      type: Date,
      required: true,
    },

    usage_limit_global: {
      type: Number,
      default: null,
    },

    usage_limit_per_user: {
      type: Number,
      default: null,
    },

    is_active: {
      type: Boolean,
      default: true,
    },

    applicable_vendor_id: {
      type: Schema.Types.ObjectId,
      ref: "vendors",
      default: null,
    },

    metadata: {
      type: Schema.Types.Mixed,
      default: null,
    },
  },
  {
    collection: "coupons",
    timestamps: {
      createdAt: "created_at",
      updatedAt: false,
    },
  }
);

// Indexes
couponSchema.index({ code: 1 }, { unique: true });
couponSchema.index({ is_active: 1 });
couponSchema.index({ valid_from: 1, valid_to: 1 });

export default model("coupons", couponSchema);
