import mongoose, { Schema } from "mongoose";

const interviewShema = new mongoose.Schema({
    userAdopter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    userAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    animalAdopted: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Publication",
        required: true
    },
    date: {
        type: datetime,
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
