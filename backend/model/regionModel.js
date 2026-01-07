import mongoose from "mongoose";

const regionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      maxlength: 100,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      maxlength: 20,
    },
    // timestampz: {
    //   type: Date,
    //   default: Date.now,
    // },
  },
  { timestamps: true }
);

export default mongoose.model("Region", regionSchema);
