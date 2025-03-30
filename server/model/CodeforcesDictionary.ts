import mongoose, {Document} from "mongoose";

const codeforcesDictionary = new mongoose.Schema({
    questionId: {
        type: String,
        required: true,
        unique: true
    }, slug: {
        type: String,
        required: true
    }
});

const CodeforcesDictionary = mongoose.model("CodeforcesDictionary", codeforcesDictionary);
export default CodeforcesDictionary;
