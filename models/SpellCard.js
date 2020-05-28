const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    imageURL: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "N/A"
    },
    categoryID: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("spell-cards", schema);