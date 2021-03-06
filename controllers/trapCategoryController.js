const TrapCategory = require("../models/TrapCategory");
const APP_NAME = "trap category"

const getCategories = async (req, res) => {
    try {
        const spellCategories = await TrapCategory.find();

        return res.status(200).json({
            success: true,
            data: spellCategories
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
}

const getCategoryByID = async (req, res) => {
    try {
        const {id} = req.params;
        const category = await TrapCategory.findById(id);

        return res.status(200).json({
            success: true,
            data: category
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
}

const addCategory = async (req, res) => {
    try {
        const {name, imageURL} = req.body;
        
        if (!name || !imageURL) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `Missing data fields`
            })
        }

        const existedCategory = await TrapCategory.findOne({name});

        if (existedCategory) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `The name of a ${APP_NAME} must be unique`
            })
        }

        const category = await new TrapCategory({name, imageURL}).save()

        return res.status(200).json({
            success: true,
            data: category,
            message: `Successfully created a ${APP_NAME}`
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
}

const deleteCategory = async (req, res) => {
    try {
        const {id} = req.params;

        const existedCategory = await TrapCategory.findById(id);

        if (!existedCategory) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `The ${APP_NAME} with that ID does not exist`
            })
        }

        const category = await TrapCategory.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            data: category,
            message: `Successfully deleted a ${APP_NAME}`
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
}

const editCategory = async (req, res) => {
    try {
        const {id} = req.params;
        const {name, imageURL} = req.body;
        let categories = await TrapCategory.find();
        let isUnique = true;
        
        if (!name || !imageURL) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `Missing data fields`
            })
        }

        const existedCategory = await TrapCategory.findById(id);

        if (!existedCategory) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `The ${APP_NAME} with that ID does not exist`
            })
        }

        categories = categories.filter(categoryItem => {
            return categoryItem._id != existedCategory._id
        })

        for (let index = 0; index < categories.length; index++) {
            const categoryItem = categories[index];
            if (categoryItem.name == existedCategory.name){
                isUnique = false;
                break;
            }
        }

        if (!isUnique) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `The name of a ${APP_NAME} must be unique`
            })
        }

        let category = await TrapCategory.findByIdAndUpdate(id, {name, imageURL});
        category = await TrapCategory.findById(id);

        return res.status(200).json({
            success: true,
            data: category,
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

module.exports = {
    getCategories,
    getCategoryByID,
    addCategory,
    deleteCategory,
    editCategory
}