import mongoose, {Schema} from "mongoose";
import bCrypt from 'bcrypt';

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password required"],
    },
})

userSchema.methods.setPassword = async function (password) {
    this.password = await bCrypt.hash(password, 10)
}

userSchema.methods.validatePassword = function (password) {
    return bCrypt.compare(password, this.password);
};

const User = mongoose.model('user', userSchema, 'users')

export default User;