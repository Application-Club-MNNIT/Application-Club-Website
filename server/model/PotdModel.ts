import mongoose, {Document} from "mongoose";

interface PotdEntry {
    link?: string;
    date: Date;
    questionId: string;
}

export interface IPotd extends Document {
    branch: string;
    batch: number;
    potds: PotdEntry[];
}

const PotdSchema = new mongoose.Schema({
    branch: {
        type: String,
        required: true,
        default: "NA",
    },
    batch: {
        type: Number,
        required: true,
    },
    potds: [
        {
            date: {
                type: Date,
                required: true,
            },
            questionId: {
                type: String,
                required: true,
            },
        },
    ],
});

const Potd = mongoose.model<IPotd>("Potd", PotdSchema);
export default Potd;