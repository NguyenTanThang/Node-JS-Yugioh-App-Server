const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    username: {
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
    avatarURL: {
        type: String,
        default: "https://image.flaticon.com/icons/png/512/103/103085.png"
    },
    created_date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("users", schema);