const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: true,
        //unique: true
    },
    userID: {
        type: String,
        required: true
    },
    thumbImageURL: {
        type: String,
        required: true
    },
    content: {
        type: [String],
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("blogs", schema);