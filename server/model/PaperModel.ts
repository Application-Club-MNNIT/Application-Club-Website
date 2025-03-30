import mongoose, { Schema, Document } from "mongoose";

interface IPreviousYearPaper extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  subject: string;
  year: number;
  fileUrl: string;
  uploadedBy: mongoose.Types.ObjectId;
  createdAt: Date;
}

const PreviousYearPaperSchema = new Schema<IPreviousYearPaper>({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true, 
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  year: {
    type: Number,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
    validate: {
      validator: function (v: string) {
        return /^(https?:\/\/(drive\.google\.com\/file\/d\/[^\/]+\/view\?usp=sharing))$/.test(v);
      },
      message: "Invalid file URL format. Must be a valid Google Drive link."
    }
  },
  uploadedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model<IPreviousYearPaper>("PreviousYearPaper", PreviousYearPaperSchema);
