const Attribute = require("../models/Attribute");
const mongoose = require("mongoose");
require('dotenv').config({ path: '../config/config.env' });
require("../config/db")();

const attributes = [
    new Attribute ({
        name: "Dark",
        imageURL: "https://vignette.wikia.nocookie.net/yugioh/images/d/de/DARK.svg/revision/latest/scale-to-width-down/340?cb=20120918053848"
    }),
    new Attribute ({
        name: "Divine",
        imageURL: "https://ms.yugipedia.com//thumb/7/7c/DIVINE.svg/450px-DIVINE.svg.png"
    }),
    new Attribute ({
        name: "Earth",
        imageURL: "https://vignette.wikia.nocookie.net/yugioh/images/a/a1/EARTH.svg/revision/latest/scale-to-width-down/340?cb=20120918053843"
    }),
    new Attribute ({
        name: "Fire",
        imageURL: "https://vignette.wikia.nocookie.net/yugioh/images/d/d6/FIRE.svg/revision/latest/scale-to-width-down/340?cb=20120918053839"
    }),
    new Attribute ({
        name: "Light",
        imageURL: "https://ms.yugipedia.com//thumb/3/39/LIGHT.svg/1200px-LIGHT.svg.png"
    }),
    new Attribute ({
        name: "Water",
        imageURL: "https://vignette.wikia.nocookie.net/yugioh/images/4/40/WATER.svg/revision/latest/scale-to-width-down/340?cb=20120918052107"
    }),
    new Attribute ({
        name: "Wind",
        imageURL: "https://vignette.wikia.nocookie.net/yugioh/images/0/01/WIND.svg/revision/latest/scale-to-width-down/340?cb=20170920205028"
    }),
]

let counter = 0;
attributes.forEach(async attribute => {
    try {
        await attribute.save()
        counter++;
        if (counter === attributes.length) {
            mongoose.connection.close(() => {
                console.log("Seeding Completed");
            });
        }
    } catch (error) {
        console.log(error); 
    }
});

