import mongoose from "mongoose";

const deliveryPartnerSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    vehicle_type: {
      type: String,
      enum: ["bike", "scooter", "car", "van", "truck"],
      required: true
    },
    vehicle_number: {
      type: String,
      trim: true
    },
    is_active: {
      type: Boolean,
      default: true
    },
    current_latitude: {
      type: Number
    },
    current_longitude: {
      type: Number
    },
    last_location_updated_at: {
      type: Date
    }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: false }
  }
);

export default mongoose.model("DeliveryPartner", deliveryPartnerSchema);
