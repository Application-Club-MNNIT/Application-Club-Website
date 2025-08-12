import mongoose, { Schema, Document } from "mongoose";

interface ITeacher extends Document {
  name: string;
  email:string;
}

const TeacherSchema = new Schema<ITeacher>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
} , {timestamps:true});

const Teacher = mongoose.model<ITeacher>("Teacher", TeacherSchema);

export default Teacher;
