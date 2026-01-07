import mongoose from "mongoose";

const deliveryEventSchema = new mongoose.Schema(
  {
    delivery_assignment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DeliveryAssignment",
      required: true
    },

    event_type: {
      type: String,
      required: true,
      trim: true
    },

    status: {
      type: String,
      default: null
    },

    latitude: {
      type: Number,
      default: null
    },

    longitude: {
      type: Number,
      default: null
    },

    notes: {
      type: String,
      default: null
    }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: false }
  }
);

const DeliveryEvent = mongoose.model("DeliveryEvent", deliveryEventSchema);
export default DeliveryEvent;
