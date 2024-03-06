import mongoose, { Schema } from "mongoose";

const interviewShema = new mongoose.Schema({
    userAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    idAdoption: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Adoption",
        required: true,
    },
    idUser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    idPet:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Publication",
        required: true,
    },
    date: {
        type: String,
        required: true
    },
    comments:[
        {
            description:{
                type: String,
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                required: true
            }
        }
    ],
    status: {
        type: String,
        enum: ["ACTIVE", "CLOSE", "OUT OF STOCK"],
        default: "ACTIVE",
    },
})

export default mongoose.model("Interview", interviewShema);
