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
  history: {
    type: String,
    required: true,
  },
  raza: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["MACHO","HEMBRA"],
    required: true
  },
  color: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true,
    enum: ["GRANDE",  "MEDIANO", "PEQUEÑO"]
  },
  isVaccinated: {
    type: Boolean,
    required: true
  },
  isCastrated: {
    type: Boolean,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ["GATOS", "PERROS"]
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
    enum: ["ACTIVE", "CLOSE"],
    default: "ACTIVE",
  },
});

export default mongoose.model("Publication", publicationShema);
