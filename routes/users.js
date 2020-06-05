var express = require('express');
var router = express.Router();
const {
    getUsers,
    getUserByID,
    login,
    signup,
    changeProfile,
    changePassword
} = require("../controllers/userController")

router.get('/', getUsers);

router.get('/:id', getUserByID);

router.post('/login', login);

router.post('/signup', signup);

router.put('/change-profile/:id', changeProfile);

router.put('/change-password/:id', changePassword);

module.exports = router;