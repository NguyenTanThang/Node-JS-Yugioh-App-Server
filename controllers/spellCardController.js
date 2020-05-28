const SpellCard = require("../models/SpellCard");
const APP_NAME = "spell card"

const getCards = async (req, res) => {
    try {
        const cards = await SpellCard.find();

        return res.status(200).json({
            success: true,
            data: cards
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
}

const getCardByID = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const card = await SpellCard.findById(id);

        return res.status(200).json({
            success: true,
            data: card
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
}

const addCard = async (req, res) => {
    try {
        const {
            name,
            categoryID,
            description,
            imageURL
        } = req.body;

        if (!name || !categoryID || !imageURL) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `Missing data fields`
            })
        }

        const existedCard = await SpellCard.findOne({
            name
        });

        if (existedCard) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `The name of a ${APP_NAME} must be unique`
            })
        }

        const card = await new SpellCard({
            name,
            categoryID,
            description,
            imageURL
        }).save();

        return res.status(200).json({
            success: true,
            data: card,
            message: `Successfully created a ${APP_NAME}`
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

const deleteCard = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        const existedCard = await SpellCard.findById(id);

        if (!existedCard) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `The ${APP_NAME} with that ID does not exist`
            })
        }

        const card = await SpellCard.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            data: card,
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

const editCard = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const {
            name,
            categoryID,
            description,
            imageURL
        } = req.body;
        let cards = await SpellCard.find();
        let isUnique = true;

        if (!name || !categoryID || !imageURL) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `Missing data fields`
            })
        }

        const existedCard = await SpellCard.findById(id);

        if (!existedCard) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `The ${APP_NAME} with that ID does not exist`
            })
        }

        cards = cards.filter(cardItem => {
            return cardItem._id != existedCard._id
        })

        for (let index = 0; index < cards.length; index++) {
            const cardItem = cards[index];
            if (cardItem.name == existedCard.name) {
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

        let card = await SpellCard.findByIdAndUpdate(id, req.body);
        card = await SpellCard.findById(id);

        return res.status(200).json({
            success: true,
            data: card,
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

const assignCardToCategory = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const {
            categoryID
        } = req.body;

        const existedCard = await SpellCard.findById(id);

        if (!existedCard) {
            return res.status(400).json({
                success: false,
                data: null,
                message: `The ${APP_NAME} with that ID does not exist`
            })
        }

        let card = await SpellCard.findByIdAndUpdate(id, {
            categoryID
        });
        card = await SpellCard.findById(id);

        return res.status(200).json({
            success: true,
            data: card,
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
    getCards,
    getCardByID,
    addCard,
    deleteCard,
    editCard,
    assignCardToCategory
}