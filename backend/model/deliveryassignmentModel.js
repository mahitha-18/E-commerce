import mongoose from "mongoose";

const deliveryAssignmentSchema = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      unique: true
    },

    delivery_partner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DeliveryPartner",
      required: true
    },

    assigned_at: {
      type: Date,
      required: true,
      default: Date.now
    },

    accepted_at: {
      type: Date,
      default: null
    },

    picked_up_at: {
      type: Date,
      default: null
    },

    delivered_at: {
      type: Date,
      default: null
    },

    status: {
      type: String,
      enum: ["assigned", "accepted", "picked_up", "completed", "cancelled"],
      default: "assigned"
    },

    cancel_reason: {
      type: String,
      default: null
    }
  },
  {
    timestamps: false
  }
);

const DeliveryAssignment = mongoose.model(
  "DeliveryAssignment",
  deliveryAssignmentSchema
);

export default DeliveryAssignment;
