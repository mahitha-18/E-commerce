import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      enum: ["Admin", "SubAdmin", "StoreAdmin", "Customer", "Employee"],
      required: true,
      unique: true
    },

    description: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Role", roleSchema);
