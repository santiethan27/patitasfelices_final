import mongoose from 'mongoose'

const addressShema = new mongoose.Schema({
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    postal_code: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true,
        default: "Colombia"
    }
})

export default mongoose.model('Address', addressShema);