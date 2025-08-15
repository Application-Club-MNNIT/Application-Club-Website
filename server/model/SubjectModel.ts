import mongoose, {Document, Schema} from "mongoose";

interface ISubject extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    subjectCode: string;
    course: string;
    createdBy: string;
}

const SubjectSchema = new Schema<ISubject>({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true,
    },
    name: {
        type: String,
        required: true,
        uppercase: true,
        trim: true,
    },
    subjectCode: {
        type: String,
        required: true,
        uppercase: true,
        trim: true,
    },
    course: {
        type: Schema.Types.String,
        enum: ["MCA", "MSC"],
        required: true
    }, createdBy: {
        type: String,
        required: true
    }
});

const Subject = mongoose.model<ISubject>("Subject", SubjectSchema);

export default Subject;
