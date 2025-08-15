import mongoose, {Document} from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";

export interface ISubmission {
    questionId: string;
    timestamp: number;
}

export interface IPlatformSubmissions {
    username: string;
    submissions: ISubmission[];
    verified: boolean;
    lastSubmissionTimestamp?: string;
    lastRequestTimestamp?: string;
}

export interface IGithub {
    username: string;
    verified: boolean;
    randomName?: string;
}

export interface IProfileVerificationData {
    randomName?: string;
    lastRequestTimestamp?: number;
}

interface Past14DaysEntry {
    date: string; // Date as a string (e.g., "YYYY-MM-DD")
    uniqueQuestionsSolved: number;
}

interface Sheet {
    name: string;  // Sheet name (e.g., "striver")
    status: string; // String of 0s and 1s representing solved status
}

interface Potds {
    status: string; // "0" for unsolved, "1" for solved
    sumOfTime: number; // Sum of timestamps when the POTD was first solved
    count: number; // Number of POTDs solved
}

export interface IUser extends Document {
    username: string;
    name: string;
    isLead: boolean;
    email: string;
    regNumber: string;
    branch: string;
    batch: number;
    phone: number;
    followedSeniors: mongoose.Types.ObjectId[];
    password: string;
    leetcode: IPlatformSubmissions;
    gfg: IPlatformSubmissions;
    codeforces: IPlatformSubmissions;
    github: IGithub;
    otp?: number;
    passwordChangedAt?: number;
    verified: boolean;
    profileVerificationData: IProfileVerificationData;
    past14Days: Past14DaysEntry[];
    sheets: Sheet[];
    potds: Potds;

    createdAt: Date;
    updatedAt: Date;

    correctPassword(candidatePassword: string, userPassword: string): Promise<boolean>;

    changePasswordAfter(JWTTimeStamp: number | undefined): boolean;
}


///////////////

const SubmissionSchema = new mongoose.Schema({
    questionId: {type: String, required: true},
    timestamp: {type: Number, required: true}
}, {_id: false});

const PlatformSchema = new mongoose.Schema({
    username: {type: String, unique: true, sparse: true},
    submissions: {type: [SubmissionSchema], default: []},
    verified: {type: Boolean, default: false},
    lastSubmissionTimestamp: {type: Number, required: true, min: 0, default: 0},
    lastRequestTimestamp: {type: Number, required: true, min: 0, default: 0}
}, {_id: false});

const defaultPlatform = {
    username: null,
    submissions: [],
    verified: false,
    lastSubmissionTimestamp: 0,
    lastRequestTimestamp: 0
};

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "username not provided"],
        minlength: [3, "username must be at least 3 characters long"],
        maxlength: [15, "username must be at max 15 characters long"],
        validate: {
            validator: function (value: string) {
                return /^[a-zA-Z0-9_]+$/.test(value);
            },
            message: "username can only contain alphabets, numbers, and underscores!"
        }
    },
    name: {
        type: String,
        required: [true, "A user must have a name"],
        minlength: [5, "name too short(min=5)!"],
        maxlength: [25, "name too long(max=25)!"]
    },
    isLead: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, "Email is required!"],
        validate: {
            validator: function (value: string) {
                return validator.isEmail(value) && value.endsWith("@mnnit.ac.in");
            },
            message: "Please enter MNNIT GSuit id."
        }
    },
    regNumber: {
        type: String,
        required: true,
        unique: true
    },
    branch: {
        type: String,
        required: true,
        default: "NA"
    },
    batch: {
        type: Number,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    followedSeniors: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    leetcode: {
        type: PlatformSchema,
        select: false,
        default: defaultPlatform
    },
    gfg: {
        type: PlatformSchema,
        select: false,
        default: defaultPlatform
    },
    codeforces: {
        type: PlatformSchema,
        select: false,
        default: defaultPlatform
    },
    github: {
        type: new mongoose.Schema({
            username: {type: String, unique: true, sparse: true},
            verified: {type: Boolean, default: false},
            randomName: {type: String}
        }, {_id: false}),
        select: false,
        default: {
            username: null,
            verified: false,
            randomName: null,
        }
    },
    password: {
        type: String,
        required: [true, "Please create a password!"],
        minlength: [8, "password must be at least 8 characters long"],
        select: false
    },
    passwordChangedAt: {
        type: Number
    },
    otp: {
        type: Number,
        select: false
    },
    verified: {
        type: Boolean,
        required: true,
        default: false
    },
    profileVerificationData: {
        type: new mongoose.Schema({
            randomName: String,
            lastRequestTimestamp: Number
        }, {_id: false}),
        select: false,
        default: {
            lastRequestTimestamp: 0
        }
    },
    past14Days: {
        type: [
            new mongoose.Schema({
                date: {type: String, required: true},
                uniqueQuestionsSolved: {type: Number, default: 0}
            }, {_id: false})
        ],
        select: false
    },
    sheets: {
        type: [
            new mongoose.Schema({
                name: {type: String, required: true},
                status: {type: String, required: true}
            }, {_id: false})
        ],
        select: false
    },
    potds: {
        type: new mongoose.Schema({
            status: {type: String, required: true},
            sumOfTime: {type: Number, required: true, default: 0},
            count: {type: Number, required: true, default: 0}
        }, {_id: false}),
        select: false
    }
}, {
    timestamps: true
});


//////////////


userSchema.pre<IUser>("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcryptjs.hash(this.password, 12);
    next();
});

userSchema.methods.correctPassword = async function (
    candidatePassword: string,
    userPassword: string
) {
    return bcryptjs.compare(candidatePassword, userPassword);
};

userSchema.methods.changePasswordAfter = function (JWTTimeStamp: number) {
    if (this.passwordChangedAt) {
        const changedTimestamp = Math.floor(this.passwordChangedAt / 1000);
        return JWTTimeStamp < changedTimestamp;
    }
    return false;
};

userSchema.pre<IUser>("save", function (next) {
    if (!this.isModified("password") || this.isNew) return next();
    this.passwordChangedAt = Date.now() - 10000;
    next();
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;