import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    role_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true
    },

    admin_id: {
      type: String,
      default: null,
      required: false
    },

    subAdmin_id: {
      type: String,
      default: null,
      required: false
    },
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    phone_number: {
      type: String,
      required: true,
      unique: true,
    },

    otp: {
      type: String,
      default: null,
    },

    password: {
      type: String,
      required: true
    },

    image: {
      type: String,
      default: null
    },
    Resume: {
      type: String,
      default: null
    },

    is_active: {
      type: Boolean,
      default: true,
      required: true
    },

    last_login_at: {
      type: Date,
      default: null,
      required: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
