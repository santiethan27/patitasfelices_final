import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://admin:admin@patitasdb.mpxr73j.mongodb.net/?retryWrites=true&w=majority&appName=PatitasDB");
        //mongodb://127.0.0.1:27017/patitasDB // LOCAL
        //mongodb+srv://admin:admin@patitasdb.mpxr73j.mongodb.net/?retryWrites=true&w=majority&appName=PatitasDB // NUBE
        console.log(">>> DB(Ok)");
    } catch (error) {
        console.log(error);
    } 
}