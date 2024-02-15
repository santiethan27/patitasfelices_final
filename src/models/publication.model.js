import mongoose from "mongoose";

const publicationShema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  raza: {
    type: String,
    required: true,
  },
  multimedia: [
    {
      public_id: {
        type: String,
        default: null,
      },
      secure_url: {
        type: String,
        default: null,
      },
    },
  ],
  status: {
    type: String,
    enum: ["active", "close", "expired", "alert"],
    default: "active",
  },
});

export default mongoose.model("Publication", publicationShema);
