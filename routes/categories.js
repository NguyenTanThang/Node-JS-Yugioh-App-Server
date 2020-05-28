var express = require('express');
var router = express.Router();
const {
    getCategories,
    getCategoryByID,
    addCategory,
    deleteCategory,
    editCategory
} = require("../controllers/categoryController")

router.get('/', getCategories);

router.get('/:id', getCategoryByID);

router.post('/add', addCategory);

router.put('/edit/:id', editCategory);

router.delete('/delete/:id', deleteCategory);

module.exports = router;