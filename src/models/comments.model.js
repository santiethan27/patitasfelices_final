import mongoose from "mongoose";

const commentsShema = new mongoose.Schema({
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
  publication: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Publication",
  },
});

export default mongoose.model("Comment", commentsShema);
