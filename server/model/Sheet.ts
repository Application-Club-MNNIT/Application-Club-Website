import mongoose from "mongoose";

const SheetSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true},
    questions: [{questionId: String, slug: String, link: String}]
});

const Sheet = mongoose.model("Sheet", SheetSchema);
export default Sheet;
