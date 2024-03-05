import mongoose from "mongoose";

const adoptionShema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  animalAdopted: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Publication",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  comments: [
    {
      description: {
        type: String,
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        required: true,
      },
    },
  ],
  status: {
    type: String,
    enum: ["ACTIVE", "CLOSE", "OUT OF STOCK"],
    default: "ACTIVE",
  },
});

export default mongoose.model("Adoption", adoptionShema);
