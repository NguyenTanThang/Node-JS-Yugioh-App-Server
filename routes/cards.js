var express = require('express');
var router = express.Router();
const {
    getCards,
    getCardByID,
    addCard,
    deleteCard,
    editCard,
    assignCardToCategories
} = require("../controllers/cardController")

router.get('/', getCards);

router.get('/:id', getCardByID);

router.post('/add', addCard);

router.put('/assign-monster-to-category/:id', assignCardToCategories);

router.put('/edit/:id', editCard);

router.delete('/delete/:id', deleteCard);

module.exports = router;