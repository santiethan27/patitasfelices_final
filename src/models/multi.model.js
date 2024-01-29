import mongoose from 'mongoose'

const multiSchema = new mongoose.Schema({
    nombre: String,
    url: String,
    contentType: String 
});

const Multimedia = mongoose.model('Multimedia', multiSchema);

module.exports = Multimedia;

