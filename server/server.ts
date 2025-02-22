// things related to server are here '>'
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, "config.env") });

//defined in the beginning to catch uncaught exceptions asap
process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception 💥 Shutting down!...");
  console.log(err);
  process.exit(1);
});

import mongoose from "mongoose";
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log("Connected to database!");
});

import app from "./app";
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection 💥 Shutting down!...");
  console.log(err);
  process.exit(1);
});
