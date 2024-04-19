const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username required"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email required"],
        unique: true,
    },
});

const User = mongoose.model("user", userSchema);

module.exports = User;