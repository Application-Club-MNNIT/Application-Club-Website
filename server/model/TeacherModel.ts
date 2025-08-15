import mongoose, {Document, Schema} from "mongoose";

interface ITeacher extends Document {
    name: string;
    email: string;
    createdBy: mongoose.Types.ObjectId;
}

const TeacherSchema = new Schema<ITeacher>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }, createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {timestamps: true});

const Teacher = mongoose.model<ITeacher>("Teacher", TeacherSchema);

export default Teacher;
