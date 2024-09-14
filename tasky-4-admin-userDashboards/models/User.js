import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role : {
        type : String,
        required : true,
        default : "user"
    }
})

// creates a model named User based on the userSchema.
const UserModel = mongoose.model('User', userSchema, 'tasky-users');

 

export default UserModel;