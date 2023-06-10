const mongoose = require("mongoose");

require("dotenv").config();

mongoose.connect(process.env.REMOTE_DB_LINK);

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    ip: {
        type: String,
        required: true
    }
})

const User = mongoose.model("User", userSchema);

module.exports.User = User;