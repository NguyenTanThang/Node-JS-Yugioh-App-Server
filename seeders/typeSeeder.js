const Type = require("../models/Type");
const mongoose = require("mongoose");
require('dotenv').config({ path: '../config/config.env' });
require("../config/db")();

const types = [
    new Type ({
        name: "Aqua"
    }),
    new Type ({
        name: "Beast"
    }),
    new Type ({
        name: "Beast-Warrior"
    }),
    new Type ({
        name: "Cyberse"
    }),
    new Type ({
        name: "Dinosaur"
    }),
    new Type ({
        name: "Divine-Beast"
    }),
    new Type ({
        name: "Dragon"
    }),
    new Type ({
        name: "Fairy"
    }),
    new Type ({
        name: "Fiend"
    }),
    new Type ({
        name: "Fish"
    }),
    new Type ({
        name: "Insect"
    }),
    new Type ({
        name: "Machine"
    }),
    new Type ({
        name: "Plant"
    }),
    new Type ({
        name: "Psychic"
    }),
    new Type ({
        name: "Pyro"
    }),
    new Type ({
        name: "Reptile"
    }),
    new Type ({
        name: "Rock"
    }),
    new Type ({
        name: "Sea Serpent"
    }),
    new Type ({
        name: "Spellcaster"
    }),
    new Type ({
        name: "Thunder"
    }),
    new Type ({
        name: "Warrior"
    }),
    new Type ({
        name: "Winged Beast"
    }),
    new Type ({
        name: "Wyrm"
    }),
    new Type ({
        name: "Zombie"
    })
]

let counter = 0;
types.forEach(async type => {
    try {
        await type.save()
        counter++;
        if (counter === types.length) {
            mongoose.connection.close(() => {
                console.log("Seeding Completed");
            });
        }
    } catch (error) {
        console.log(error); 
    }
});

