const Attribute = require("../models/Attribute");
const APP_NAME = "attribute"

const getAttributes = async (req, res) => {
    try {
        const attributes = await Attribute.find();

        return res.status(200).json({
            success: true,
            data: attributes
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
}

const getAttributeByID = async (req, res) => {
    try {
        const {id} = req.params;
        const attribute = await Attribute.findById(id);

        return res.status(200).json({
            success: true,
            data: attribute
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
}

const addAttribute = async (req, res) => {
    try {
        const {name, imageURL} = req.body;
        
        if (!name || !imageURL) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `Missing data fields`
            })
        }

        const existedAttribute = await Attribute.findOne({name});

        if (existedAttribute) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `The name of an ${APP_NAME} must be unique`
            })
        }

        const attribute = await new Attribute({name, imageURL}).save();

        return res.status(200).json({
            success: true,
            data: attribute,
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

const deleteAttribute = async (req, res) => {
    try {
        const {id} = req.params;

        const existedAttribute = await Attribute.findById(id);

        if (!existedAttribute) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `The ${APP_NAME} with that ID does not exist`
            })
        }

        const attribute = await Attribute.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            data: attribute,
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

const editAttribute = async (req, res) => {
    try {
        const {id} = req.params;
        const {name, imageURL} = req.body;
        let attributes = await Attribute.find();
        let isUnique = true;
        
        if (!name || !imageURL) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `Missing data fields`
            })
        }

        const existedAttribute = await Attribute.findById(id);

        if (!existedAttribute) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `The ${APP_NAME} with that ID does not exist`
            })
        }

        attributes = attributes.filter(attributeItem => {
            return attributeItem._id != existedAttribute._id
        })

        for (let index = 0; index < attributes.length; index++) {
            const attributeItem = attributes[index];
            if (attributeItem.name == existedAttribute.name){
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

        let attribute = await Attribute.findByIdAndUpdate(id, {name});
        attribute = await Attribute.findById(id);

        return res.status(200).json({
            success: true,
            data: attribute,
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
    getAttributes,
    getAttributeByID,
    addAttribute,
    deleteAttribute,
    editAttribute
}