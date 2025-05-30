/** Packages */
const mongoose = require("mongoose");

/** Config */
import config from "../Config/config";

export const connect = () => {
    // Connecting to the database
    mongoose.set('strictQuery', false)
    mongoose
        .connect(config?.MONGOURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("Successfully connected to database, MONGO_URI : ", config?.MONGOURI);
        })
        .catch((error) => {
            console.log("database connection failed. exiting now...");
            console.error(error);
            process.exit(1);
        });
};