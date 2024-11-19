import mongoose from "mongoose";

//Basic user model with name, email, image, password and googleId

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true  
    },
    password: {
        type: String,
    },
    googleId: {
        type: String
    },
    image: {
        type: String
    }
});


export const User = mongoose.models.User || mongoose.model('User', userSchema);