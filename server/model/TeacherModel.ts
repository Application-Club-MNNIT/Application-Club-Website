import mongoose, {Document, Schema} from "mongoose";

interface ITeacher extends Document {
    name: string;
    email: string;
    createdBy: string;
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
        type: String,
        required: true
    }
}, {timestamps: true});

const Teacher = mongoose.model<ITeacher>("Teacher", TeacherSchema);

export default Teacher;
