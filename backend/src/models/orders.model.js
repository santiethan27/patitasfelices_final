import mongoose from "mongoose";

const orderShema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  image: {
    public_id: {
      type: String,
      default: null,
    },
    secure_url: {
      type: String,
      default: null,
    },
  },
  status: {
    type: String,
    enum: ["ACTIVE", "CLOSE"],
    default: "ACTIVE",
  },
});

export default mongoose.model("Order", orderShema);
