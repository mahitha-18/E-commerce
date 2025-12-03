import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    slug: { type: String, required: true, unique: true },

    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },

    image: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
