import mongoose, {Document} from "mongoose";

const leetcodeDictionary = new mongoose.Schema({
    questionId: {
        type: String,
        required: true,
        unique: true
    }, slug: {
        type: String,
        required: true
    }
});

const LeetcodeDictionary = mongoose.model("LeetcodeDictionary", leetcodeDictionary);
export default LeetcodeDictionary;
