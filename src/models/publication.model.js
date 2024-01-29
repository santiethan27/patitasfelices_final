import mongoose from "mongoose";

const publicationShema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  multimedia: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Multimedia",
  }],
  status: {
    type: String,
    enum: ["active", "close", "expired", "alert"],
    default: "active",
  },
});

export default moongose.model("Publication", publicationShema);
