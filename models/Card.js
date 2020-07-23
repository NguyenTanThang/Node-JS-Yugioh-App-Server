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
    typeID: {
        type: String,
        required: true,
    },
    attributeID: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "N/A"
    },
    pendulumDescription: {
        type: String,
        default: null
    },
    levels: {
        type: Number,
        default: 0
    },
    atk: {
        type: Number,
        default: 0
    },
    def: {
        type: Number,
        default: 0
    },
    categoryIDs: {
        type: [String],
        default: []
    },
    pendulumScale: {
        type: Number,
        default: null
    },
    created_date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("cards", schema);