const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })

        console.log(`Database connected on ${conn.connection.host}:${conn.connection.port}`)
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;