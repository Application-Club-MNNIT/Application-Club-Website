import mongoose, { Document, Schema } from "mongoose";

export interface ISenior extends Document {
    name: string;
    regNumber: string;
    linkedin: string;
    batch: string;          
    branch: string; 
    followers: mongoose.Types.ObjectId[];
    isTopMentor: boolean;
    interviews: {
        date: Date;
        company: string;
        role: string;
        status: string;
        questionTypes?: string[];
        interviewExperience?: string;
        adviceToJuniors?: string;
    }[];
    updateMentorStatus: () => Promise<void>;
}

const SeniorSchema = new Schema<ISenior>({
    name: { type: String, required: true },
    regNumber: { type: String, required: true, unique: true },
    linkedin: { type: String, required: true },
    batch: { type: String, required: true },       
    branch: { type: String, required: true },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isTopMentor: { type: Boolean, default: false },
  
    interviews: [
        {
            date: { type: Date },
            company: { type: String, required: true },
            role: { type: String, required: true },
            status: { type: String, required: true },
            questionTypes: [{ type: String }],
            interviewExperience: { type: String },
            adviceToJuniors: { type: String }
        }
    ]
});

SeniorSchema.methods.updateMentorStatus = async function () {
    this.isTopMentor = this.followers.length >= 50;
    await this.save();
};

export default mongoose.model<ISenior>("Senior", SeniorSchema);