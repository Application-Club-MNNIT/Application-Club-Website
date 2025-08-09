import mongoose, { Schema, Document, Types } from "mongoose";

interface IQuestionPaperUploadRequest extends Document {
  course: Types.ObjectId;//
  subject:Types.ObjectId;//
  academicSession: string;
  year: number;//
  semester: number;//
  teacher: Types.ObjectId;//
  examType: string;//
  driveLink: string;//
  status: "pending" | "approved" | "rejected";
  uploadedBy:Types.ObjectId;//
}

const QuestionPaperUploadRequestSchema = new Schema<IQuestionPaperUploadRequest>({
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  subject:{
    type:Schema.Types.ObjectId,
    ref:"Subject",
    required:true,
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

  teacher: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
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
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  uploadedBy:{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }


  //Mongodb will auto add created and updated at
}, { timestamps: true });

// Validation Middleware
QuestionPaperUploadRequestSchema.pre("validate", async function (next) {
  try {
    const Course = mongoose.model("Course"); // Get the Course model
    const courseDoc = await Course.findById(this.course);

    if (!courseDoc) {
      return next(new Error("Invalid course selection."));
    }

    const { duration } = courseDoc; // Fetch duration from Course model

    const validYears = Array.from({ length: duration }, (_, i) => i + 1);
    
    // Use the predefined validSemesters mapping
    const validSemestersMap: Record<number, number[]> = {
      1: [1, 2],
      2: [3, 4],
      3: [5, 6],
      4: [7, 8],
    };

    if (!validYears.includes(this.year)) {
      return next(new Error(`Invalid year ${this.year} for course ${courseDoc.name}.`));
    }

    // Check if the semester is valid for the given year
    if (!validSemestersMap[this.year] || !validSemestersMap[this.year].includes(this.semester)) {
      return next(new Error(`Invalid semester ${this.semester} for year ${this.year}.`));
    }

    next();
  } catch (error) {
    next(error);
  }
});


const QuestionPaperUploadRequest = mongoose.model<IQuestionPaperUploadRequest>(
  "QuestionPaperUploadRequest",
  QuestionPaperUploadRequestSchema
);

export default QuestionPaperUploadRequest;
