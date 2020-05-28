var express = require('express');
var router = express.Router();
const {
    getCards,
    getCardByID,
    addCard,
    deleteCard,
    editCard,
    assignCardToCategory
} = require("../controllers/spellCardController")

router.get('/', getCards);

router.get('/:id', getCardByID);

router.post('/add', addCard);

router.put('/assign-card-to-category/:id', assignCardToCategory);

router.put('/edit/:id', editCard);

router.delete('/delete/:id', deleteCard);

module.exports = router;