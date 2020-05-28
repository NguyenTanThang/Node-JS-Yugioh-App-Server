var express = require('express');
var router = express.Router();
const {
    getAttributes,
    getAttributeByID,
    addAttribute,
    deleteAttribute,
    editAttribute
} = require("../controllers/attributeController")

router.get('/', getAttributes);

router.get('/:id', getAttributeByID);

router.post('/add', addAttribute);

router.put('/edit/:id', editAttribute);

router.delete('/delete/:id', deleteAttribute);

module.exports = router;