var express = require('express');
var router = express.Router();
const {
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
} = require("../controllers/deckController")

router.get('/', getDecks);

router.get('/user/:userID', getDecksByUserID);

router.get('/:id', getDeckByID);

router.post('/add', addDeck);

router.put('/edit/:id', editDeck);

router.delete('/delete/:id', deleteDeck);

router.put('/spell-card/:cardID/deck/:deckID', addSpellCardToDeck);

router.put('/trap-card/:cardID/deck/:deckID', addTrapCardToDeck);

router.put('/monster-card/:cardID/deck/:deckID', addMonsterCardToDeck);

router.delete('/monster-card/:cardID/deck/:deckID', removeMonsterCardOfDeck);

router.delete('/spell-card/:cardID/deck/:deckID', removeSpellCardOfDeck);

router.delete('/trap-card/:cardID/deck/:deckID', removeTrapCardOfDeck);

module.exports = router;