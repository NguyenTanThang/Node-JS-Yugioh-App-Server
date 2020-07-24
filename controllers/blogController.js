const Blog = require("../models/Blog");
const User = require("../models/User");
const APP_NAME = "blog"

const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();

        return res.status(200).json({
            success: true,
            data: blogs
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
}

const getBlogByID = async (req, res) => {
    try {
        const {id} = req.params;
        const blog = await Blog.findById(id);
        const {userID} = blog;

        const user = await User.findById(userID);

        return res.status(200).json({
            success: true,
            data: {
                blog,
                user
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

const addBlog = async (req, res) => {
    try {
        const {title, thumbImageURL, content, userID} = req.body;
        
        if (!userID || !title || !thumbImageURL || !content) {
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

        const blog = await new Blog({title, thumbImageURL, content, userID}).save();

        return res.status(200).json({
            success: true,
            data: blog,
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

const deleteBlog = async (req, res) => {
    try {
        const {id} = req.params;

        const existedBlog = await Blog.findById(id);

        if (!existedBlog) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `The ${APP_NAME} with that ID does not exist`
            })
        }

        const blog = await Blog.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            data: blog,
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

const editBlog = async (req, res) => {
    try {
        const {id} = req.params;
        const {userID} = req.body;
        
        const existedBlog = await Blog.findById(id);
        const existedUser = await User.findById(userID);

        if (!existedBlog) {
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

        if (existedUser._id != existedBlog.userID){
            return res.status(400).json({
                success: false,
                data: null,
                message: `This blog belongs to someone else`
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

        let blog = await Blog.findByIdAndUpdate(id, req.body);
        blog = await Blog.findById(id);

        return res.status(200).json({
            success: true,
            data: blog,
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

const getBlogsByUserID = async (req, res) => {
    try {
        const {userID} = req.params;
        const blogs = await Blog.find({userID});

        return res.status(200).json({
            success: true,
            data: blogs
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
}

module.exports = {
    getBlogsByUserID,
    editBlog,
    getBlogs,
    getBlogByID,
    addBlog,
    deleteBlog
}