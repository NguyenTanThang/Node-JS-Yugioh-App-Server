const Category = require("../models/Category");
const mongoose = require("mongoose");
require('dotenv').config({ path: '../config/config.env' });
require("../config/db")();

const categories = [
    new Category ({
        name: "Normal"
    }),
    new Category ({
        name: "Effect"
    }),
    new Category ({
        name: "Fusion"
    }),
    new Category ({
        name: "Tuner"
    }),
    new Category ({
        name: "Ritual"
    }),
    new Category ({
        name: "Synchro"
    }),
    new Category ({
        name: "Xyz"
    }),
    new Category ({
        name: "Pendulum"
    }),
    new Category ({
        name: "Link"
    }),
    new Category ({
        name: "Spell"
    }),
    new Category ({
        name: "Trap"
    })
]

let counter = 0;
categories.forEach(async category => {
    try {
        await category.save()
        counter++;
        if (counter === categories.length) {
            mongoose.connection.close(() => {
                console.log("Seeding Completed");
            });
        }
    } catch (error) {
        console.log(error); 
    }
});

