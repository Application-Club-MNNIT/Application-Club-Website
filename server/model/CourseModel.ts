import mongoose, { Schema, Document } from "mongoose";

interface ICourse extends Document {
  name: string;
  duration: number;
}

const courseDurations: Record<string, number> = {
  Btech: 4,
  Mtech: 2,
  Msc: 2,
  Mca: 3,
  Mba: 2,
};

const CourseSchema = new Schema<ICourse>({
  name: {
    type: String,
    required: true,
    enum: Object.keys(courseDurations),
  },
  duration: {
    type: Number,
    required: true,
  },
});

CourseSchema.pre("validate", function (next) {
  if (courseDurations[this.name]) {
    this.duration = courseDurations[this.name];
  }
  next();
});

const Course = mongoose.model<ICourse>("Course", CourseSchema);

export default Course;
