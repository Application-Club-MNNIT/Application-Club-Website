// things related to server are here '>'
import path from "path";
import dotenv from "dotenv";
import app from "./app";

dotenv.config({path: path.join(__dirname, "config.env")});

//defined in the beginning to catch uncaught exceptions asap
process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception 💥 Shutting down!...");
    console.log(err);
    process.exit(1);
});

const mongoose = require("mongoose");
const DB = process.env.DATABASE?.replace(
    "<password>",
    process.env.DATABASE_PASSWORD ?? ""
);

if (!DB) {
    throw new Error("Database connection string is not defined in environment variables");
}

mongoose.connect(DB).then(() => {
    console.log("Connected to database!");
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});

process.on("unhandledRejection", (err) => {
    console.log("Unhandled Rejection 💥 Shutting down!...");
    console.log(err);
    process.exit(1);
});
