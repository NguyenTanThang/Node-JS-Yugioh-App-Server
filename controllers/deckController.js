const Deck = require("../models/Deck");
const User = require("../models/User");
const SpellCard = require("../models/SpellCard");
const TrapCard = require("../models/TrapCard");
const Card = require("../models/Card");
const APP_NAME = "deck"

const getDecks = async (req, res) => {
    try {
        const decks = await Deck.find();

        return res.status(200).json({
            success: true,
            data: decks
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
}

const getDeckByID = async (req, res) => {
    try {
        const {id} = req.params;
        const deck = await Deck.findById(id);
        const {spellCards, trapCards, monsterCards} = deck;
        let returnedSpellCards = [];
        let returnedTrapCards = [];
        let returnedMonsterCards = [];

        console.log({spellCards, trapCards, monsterCards})

        for (let index = 0; index < spellCards.length; index++) {
            const spellCardID = spellCards[index];
            const spellCardItem = await SpellCard.findById(spellCardID);
            returnedSpellCards.push(spellCardItem)
        }

        for (let index = 0; index < trapCards.length; index++) {
            const trapCardID = trapCards[index];
            const trapCardItem = await TrapCard.findById(trapCardID)
            returnedTrapCards.push(trapCardItem)
        }

        for (let index = 0; index < monsterCards.length; index++) {
            const monsterCardID = monsterCards[index];
            const monsterCardItem = await Card.findById(monsterCardID)
            returnedMonsterCards.push(monsterCardItem)
        }

        console.log({returnedSpellCards, returnedTrapCards, returnedMonsterCards})

        return res.status(200).json({
            success: true,
            data: {
                deck,
                spellCards: returnedSpellCards,
                trapCards: returnedTrapCards,
                monsterCards: returnedMonsterCards
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
}

const addDeck = async (req, res) => {
    try {
        const {name, userID} = req.body;
        
        if (!name || !userID) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `Missing data fields`
            })
        }

        /*
        const existedDeck = await Deck.findOne({name});

        if (existedDeck) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `The name of an ${APP_NAME} must be unique`
            })
        }
        */
        
        const existedUser = await User.findById(userID)

        if (!existedUser) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `User does not exist`
            })
        }

        const deck = await new Deck({name, userID}).save();

        return res.status(200).json({
            success: true,
            data: deck,
            message: `Successfully created an ${APP_NAME}`
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
}

const deleteDeck = async (req, res) => {
    try {
        const {id} = req.params;

        const existedDeck = await Deck.findById(id);

        if (!existedDeck) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `The ${APP_NAME} with that ID does not exist`
            })
        }

        const deck = await Deck.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            data: deck,
            message: `Successfully deleted an ${APP_NAME}`
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
}

const editDeck = async (req, res) => {
    try {
        const {id} = req.params;
        const {name, userID} = req.body;
        let decks = await Deck.find();
        let isUnique = true;
        
        if (!name) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `Missing data fields`
            })
        }

        const existedDeck = await Deck.findById(id);
        const existedUser = await User.findById(userID);

        if (!existedDeck) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `The ${APP_NAME} with that ID does not exist`
            })
        }

        if (!existedUser) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `The user with that ID does not exist`
            })
        }

        if (existedUser._id != existedDeck.userID){
            return res.status(400).json({
                success: false,
                data: null,
                message: `This deck belongs to someone else`
            })
        }

        /*
        decks = decks.filter(deckItem => {
            return deckItem._id != existedDeck._id
        })

        for (let index = 0; index < decks.length; index++) {
            const deckItem = decks[index];
            if (deckItem.name == existedDeck.name){
                isUnique = false;
                break;
            }
        }

        if (!isUnique) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `The name of an ${APP_NAME} must be unique`
            })
        }
        */

        let deck = await Deck.findByIdAndUpdate(id, {name});
        deck = await Deck.findById(id);

        return res.status(200).json({
            success: true,
            data: deck,
            message: `Successfully updated a ${APP_NAME}`
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
}

const addSpellCardToDeck = async (req, res) => {
    try {
        const {cardID, deckID} = req.params;
        const spellCard = await SpellCard.findById(cardID);
        let deck = await Deck.findById(deckID);

        if (!spellCard) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `The spell card with that ID does not exist`
            })
        }

        if (!deck) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `The ${APP_NAME} card with that ID does not exist`
            })
        }

        let listOfSpellCards = deck.spellCards.concat(cardID)

        deck = await Deck.findByIdAndUpdate(deckID, {spellCards: listOfSpellCards});
        deck = await Deck.findById(deckID);
        
        return res.status(200).json({
            success: true,
            data: deck,
            message: `Successfully updated a ${APP_NAME}`
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
}

const addTrapCardToDeck = async (req, res) => {
    try {
        const {cardID, deckID} = req.params;
        const trapCard = await TrapCard.findById(cardID);
        let deck = await Deck.findById(deckID);

        if (!trapCard) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `The trap card with that ID does not exist`
            })
        }

        if (!deck) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `The ${APP_NAME} card with that ID does not exist`
            })
        }

        let listOfTrapCards = [...deck.trapCards, cardID]

        deck = await Deck.findByIdAndUpdate(deckID, {trapCards: listOfTrapCards});
        deck = await Deck.findById(deckID);
        
        return res.status(200).json({
            success: true,
            data: deck,
            message: `Successfully updated a ${APP_NAME}`
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
}

const addMonsterCardToDeck = async (req, res) => {
    try {
        const {cardID, deckID} = req.params;
        const monsterCard = await Card.findById(cardID);
        let deck = await Deck.findById(deckID);

        if (!monsterCard) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `The monster card with that ID does not exist`
            })
        }

        if (!deck) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `The ${APP_NAME} card with that ID does not exist`
            })
        }

        let listOfMonsterCards = [...deck.monsterCards, monsterCard._id]

        deck = await Deck.findByIdAndUpdate(deckID, {monsterCards: listOfMonsterCards});
        deck = await Deck.findById(deckID);
        
        return res.status(200).json({
            success: true,
            data: deck,
            message: `Successfully updated a ${APP_NAME}`
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
}

const getDecksByUserID = async (req, res) => {
    try {
        const {userID} = req.params;
        const decks = await Deck.find({userID});

        return res.status(200).json({
            success: true,
            data: decks
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
}

const removeMonsterCardOfDeck = async (req, res) => {
    try {
        const {cardID, deckID} = req.params;
        const monsterCard = await Card.findById(cardID);
        let deck = await Deck.findById(deckID);

        if (!monsterCard) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `The monster card with that ID does not exist`
            })
        }

        if (!deck) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `The ${APP_NAME} card with that ID does not exist`
            })
        }

        let listOfMonsterCards = deck.monsterCards;

        for (let index = 0; index < listOfMonsterCards.length; index++) {
            const monsterCard = listOfMonsterCards[index];
            if (monsterCard === cardID){
                listOfMonsterCards.splice(index, 1)
                break;
            }
        }

        deck = await Deck.findByIdAndUpdate(deckID, {monsterCards: listOfMonsterCards});
        deck = await Deck.findById(deckID);
        
        return res.status(200).json({
            success: true,
            data: deck,
            message: `Successfully updated a ${APP_NAME}`
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
}

const removeSpellCardOfDeck = async (req, res) => {
    try {
        const {cardID, deckID} = req.params;
        const monsterCard = await SpellCard.findById(cardID);
        let deck = await Deck.findById(deckID);

        if (!monsterCard) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `The monster card with that ID does not exist`
            })
        }

        if (!deck) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `The ${APP_NAME} card with that ID does not exist`
            })
        }

        let listOfMonsterCards = deck.spellCards;

        for (let index = 0; index < listOfMonsterCards.length; index++) {
            const monsterCard = listOfMonsterCards[index];
            if (monsterCard === cardID){
                listOfMonsterCards.splice(index, 1)
                break;
            }
        }

        deck = await Deck.findByIdAndUpdate(deckID, {spellCards: listOfMonsterCards});
        deck = await Deck.findById(deckID);
        
        return res.status(200).json({
            success: true,
            data: deck,
            message: `Successfully updated a ${APP_NAME}`
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
}

const removeTrapCardOfDeck = async (req, res) => {
    try {
        const {cardID, deckID} = req.params;
        const monsterCard = await TrapCard.findById(cardID);
        let deck = await Deck.findById(deckID);

        if (!monsterCard) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `The monster card with that ID does not exist`
            })
        }

        if (!deck) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `The ${APP_NAME} card with that ID does not exist`
            })
        }

        let listOfMonsterCards = deck.trapCards;

        for (let index = 0; index < listOfMonsterCards.length; index++) {
            const monsterCard = listOfMonsterCards[index];
            if (monsterCard === cardID){
                listOfMonsterCards.splice(index, 1)
                break;
            }
        }

        deck = await Deck.findByIdAndUpdate(deckID, {trapCards: listOfMonsterCards});
        deck = await Deck.findById(deckID);
        
        return res.status(200).json({
            success: true,
            data: deck,
            message: `Successfully updated a ${APP_NAME}`
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
}

module.exports = {
    getDecks,
    getDeckByID,
    addDeck,
    editDeck,
    deleteDeck,
    addSpellCardToDeck,
    addTrapCardToDeck,
    addMonsterCardToDeck,
    getDecksByUserID,
    removeMonsterCardOfDeck,
    removeSpellCardOfDeck,
    removeTrapCardOfDeck
}