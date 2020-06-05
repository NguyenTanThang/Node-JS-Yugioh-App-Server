const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    userID: {
        type: String,
        required: true
    },
    spellCards: {
        type: [String],
        default: []
    },
    trapCards: {
        type: [String],
        default: []
    },
    monsterCards: {
        type: [String],
        default: []
    },
    created_date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("decks", schema);