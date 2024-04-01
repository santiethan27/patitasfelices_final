import mongoose from "mongoose";

const productShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ["OBJETOS", "JUGUETES", "ROPA"]
    },
    primary:
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
    options: [
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
        enum: ["ACTIVE", "CLOSE", "OUT OF STOCK"],
        default: "ACTIVE",
    },
});

export default mongoose.model("Product", productShema);