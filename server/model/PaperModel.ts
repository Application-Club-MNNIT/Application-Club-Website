import mongoose, { Schema, Document, Types } from "mongoose";



//Represents Papers approved by th Admin

interface IPaper extends Document {
  course: Types.ObjectId;
  academicSession: string;
  year: number;
  semester: number;
  subject: Types.ObjectId;
  teacher: Types.ObjectId;
  examType: string;
  driveLink: string;
  uploadedBy:Types.ObjectId;
}

const PaperSchema = new Schema<IPaper>({
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  academicSession: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  subject: {
    type: Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  examType: {
    type: String,
    required: true,
    enum: ["Mid-Sem", "End-Sem"],
  },
  driveLink: {
    type: String,
    required: true,
    validate: {
      validator: function (v: string) {
        return /^(https?:\/\/(drive\.google\.com\/file\/d\/[^\/]+\/view\?usp=sharing))$/.test(v);
      },
      message: "Invalid file URL format. Must be a valid Google Drive link.",
    },
  },

  uploadedBy:{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
} , {timestamps:true});



const Paper = mongoose.model<IPaper>("Paper",PaperSchema);

export default Paper;
