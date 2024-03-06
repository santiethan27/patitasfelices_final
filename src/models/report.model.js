import mongoose from "mongoose";

const reportShema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  siteDescription: {
    type: String,
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
});

export default mongoose.model("Report", reportShema);
