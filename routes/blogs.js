var express = require('express');
var router = express.Router();
const {
    getBlogsByUserID,
    editBlog,
    getBlogs,
    getBlogByID,
    addBlog,
    deleteBlog
} = require("../controllers/blogController")

router.get('/', getBlogs);

router.get('/user/:userID', getBlogsByUserID);

router.get('/:id', getBlogByID);

router.post('/add', addBlog);

router.put('/edit/:id', editBlog);

router.delete('/delete/:id', deleteBlog);

module.exports = router;