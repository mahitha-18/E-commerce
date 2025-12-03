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
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      required: false
    },

    subAdmin_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
      required: true
    },

    otp: {
      type: String,
      default: null
    },

    otp_expires_at: {
  type: Date,
  default: null
},
    password: {
      type: String,
      required: true
    },

    image: {
      type: String, // URL path of image stored locally or in S3
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

// Hash password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default mongoose.model("User", userSchema);
