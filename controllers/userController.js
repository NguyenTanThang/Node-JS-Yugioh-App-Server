const User = require("../models/User");
const APP_NAME = "user";
const {encrypt, compare} = require("../utils/encryptor");

const getUsers = async (req, res) => {
    try {
        const users = await User.find();

        return res.status(200).json({
            success: true,
            data: users
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
}

const getUserByID = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);

        return res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
}

const signup = async (req, res) => {
    try {
        let {username, email, password} = req.body;
        
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `Missing data fields`
            })
        }

        const existedUser = await User.findOne({email});

        if (existedUser) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `The email of an ${APP_NAME} must be unique`
            })
        }

        password = encrypt(password);
        const user = await new User({username, email, password}).save();

        return res.status(200).json({
            success: true,
            data: user,
            message: `Successfully created an ${APP_NAME}`
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `Missing credentials`
            })
        }

        const existedUser = await User.findOne({email});

        if (!existedUser || !compare(password, existedUser.password)) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `Wrong email or password`
            })
        }

        const user = existedUser

        return res.status(200).json({
            success: true,
            data: user,
            message: `Successfully logged in`
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

const changeProfile = async (req, res) => {
    try {
        const {id} = req.params;
        const {username, avatarURL} = req.body;
        
        if (!username) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `Missing data fields`
            })
        }

        const existedUser = await User.findById(id);

        if (!existedUser) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `The ${APP_NAME} with that ID does not exist`
            })
        }

        let user = await User.findByIdAndUpdate(id, req.body);
        user = await User.findById(id);

        return res.status(200).json({
            success: true,
            data: user,
            message: `Successfully updated an ${APP_NAME}`
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

const changePassword = async (req, res) => {
    try {
        const {id} = req.params;
        let {oldPassword, newPassword} = req.body;
        
        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `Missing data fields`
            })
        }

        const existedUser = await User.findById(id);

        if (!existedUser) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `The ${APP_NAME} with that ID does not exist`
            })
        }

        if (!compare(oldPassword, existedUser.password)){
            return res.status(400).json({
                success: false,
                data: null,
                message: `Invalid password`
            })
        }

        newPassword = encrypt(newPassword);

        let user = await User.findByIdAndUpdate(id, {password: newPassword});
        user = await User.findById(id);

        return res.status(200).json({
            success: true,
            data: user,
            message: `Successfully updated an ${APP_NAME}`
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
    getUsers,
    getUserByID,
    login,
    signup,
    changeProfile,
    changePassword
}