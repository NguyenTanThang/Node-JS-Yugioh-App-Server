var express = require('express');
var router = express.Router();
const {
    getTypes,
    getTypeByID,
    addType,
    deleteType,
    editType
} = require("../controllers/typeController")

router.get('/', getTypes);

router.get('/:id', getTypeByID);

router.post('/add', addType);

router.put('/edit/:id', editType);

router.delete('/delete/:id', deleteType);

module.exports = router;