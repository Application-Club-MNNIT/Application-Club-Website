import mongoose from "mongoose";

const gfgDictionary = new mongoose.Schema({
    questionId: {
        type: String,
        required: true,
        unique: true
    }, slug: {
        type: String,
        required: true
    }
});

const GfgDictionary = mongoose.model("GfgDictionary", gfgDictionary);
export default GfgDictionary;
