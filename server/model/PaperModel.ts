import mongoose, {Schema, Document, Types} from "mongoose";

interface IPaper extends Document {
    course: "MCA" | "MSC";
    subject: Types.ObjectId;
    academicSession: string;
    year: number;
    semester: number;
    teacher: Types.ObjectId;
    examType: string;
    driveLink: string;
    status: "pending" | "approved" | "rejected";
    uploadedBy: Types.ObjectId;
    verifiedBy: Types.ObjectId;
}

const PaperSchema = new Schema<IPaper>({
    course: {
        type: String,
        enum: ["MCA", "MSC"],
        required: true,
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: "Subject",
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
    teacher: {
        type: Schema.Types.ObjectId,
        ref: "Teacher",
    },
    examType: {
        type: String,
        required: true,
        enum: ["Mid-Sem", "End-Sem", "Practical", "Other"],
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
    uploadedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }, verifiedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }

}, {timestamps: true});
// Validation Middleware
PaperSchema.pre("validate", async function (next) {
    // Validate course
    const validCourses = ["MCA", "MSC"] as const;
    if (!validCourses.includes(this.course as typeof validCourses[number])) {
        return next(new Error("Course must be either MCA or MSC."));
    }
    // Define max years for each course
    const maxYears: Record<typeof validCourses[number], number> = {
        MCA: 3,
        MSC: 2
    };

    // Validate year based on course
    if (this.year < 1 || this.year > maxYears[this.course]) {
        return next(new Error(`For ${this.course}, year must be between 1 and ${maxYears[this.course]}.`));
    }

    // Each year has two semesters
    const validSemesters: { [key: number]: number[] } = {
        1: [1, 2],
        2: [3, 4],
        3: [5, 6]
    };

    // Get valid semesters for the current year
    const currentYearSemesters = validSemesters[this.year];
    if (!currentYearSemesters) {
        return next(new Error("Invalid year specified."));
    }

    // Validate semester based on year
    if (!currentYearSemesters.includes(this.semester)) {
        return next(
            new Error(`For year ${this.year}, semester must be ${currentYearSemesters.join(" or ")}.`)
        );
    }

    next();
});

const Paper = mongoose.model<IPaper>(
    "Paper",
    PaperSchema
);

export default Paper;
