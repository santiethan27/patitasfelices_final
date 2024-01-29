// user.model.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      maxlength: 10,
      minlength: 10,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true, // único
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
    yearbirth: {
      type: Date,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    rol: {
      type: String,
      required: true,
      default: "user",
      enum: ["admin", "user"],
    },
    photo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Multimedia",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
