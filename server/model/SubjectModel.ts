import mongoose, { Schema, Document, Types } from "mongoose";

interface ISubject extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  subjectCode:string;
  courses:Types.ObjectId[];
  
}

const SubjectSchema = new Schema<ISubject>({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true, 
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  subjectCode: {
    type: String,
    required: true,
    trim: true,
  },
  courses:[
      {
    type:Schema.Types.ObjectId,
    ref: "Course",
    required:true
  }
  ]

});

const Subject = mongoose.model<ISubject>("Subject", SubjectSchema);

export default Subject;
