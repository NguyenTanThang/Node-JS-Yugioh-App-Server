const Type = require("../models/Type");
const APP_NAME = "type"

const getTypes = async (req, res) => {
    try {
        const types = await Type.find();

        return res.status(200).json({
            success: true,
            data: types
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
}

const getTypeByID = async (req, res) => {
    try {
        const {id} = req.params;
        const type = await Type.findById(id);

        return res.status(200).json({
            success: true,
            data: type
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
}

const addType = async (req, res) => {
    try {
        const {name} = req.body;
        
        if (!name) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `Missing data fields`
            })
        }

        const existedType = await Type.findOne({name});

        if (existedType) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `The name of a ${APP_NAME} must be unique`
            })
        }

        const type = await new Type({name}).save();

        return res.status(200).json({
            success: true,
            data: type,
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

const deleteType = async (req, res) => {
    try {
        const {id} = req.params;

        const existedType = await Type.findById(id);

        if (!existedType) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `The ${APP_NAME} with that ID does not exist`
            })
        }

        const type = await Type.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            data: type,
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

const editType = async (req, res) => {
    try {
        const {id} = req.params;
        const {name} = req.body;
        let types = await Type.find();
        let isUnique = true;
        
        if (!name) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `Missing data fields`
            })
        }

        const existedType = await Type.findById(id);

        if (!existedType) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `The ${APP_NAME} with that ID does not exist`
            })
        }

        types = types.filter(typeItem => {
            return typeItem._id != existedType._id
        })

        for (let index = 0; index < types.length; index++) {
            const typeItem = types[index];
            if (typeItem.name == existedType.name){
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

        let type = await Type.findByIdAndUpdate(id, {name});
        type = await Type.findById(id);

        return res.status(200).json({
            success: true,
            data: type,
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
    getTypes,
    getTypeByID,
    addType,
    deleteType,
    editType
}