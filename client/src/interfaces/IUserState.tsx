interface ISubmission {
    questionId: string;
    timestamp: number;
}

interface IPlatformSubmissions {
    username: string;
    submissions: ISubmission[];
    verified: boolean;
    lastSubmissionTimestamp?: string;
    lastRequestTimestamp?: string;
}

interface IGithub {
    username: string;
    verified: boolean;
    randomName?: string;
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

interface IUserState {
    username: string;
    name: string;
    email: string;
    regNumber: string;
    branch: string;
    batch: number;
    phone: number;
    leetcode: IPlatformSubmissions;
    gfg: IPlatformSubmissions;
    codeforces: IPlatformSubmissions;
    github: IGithub;
    past14Days: Past14DaysEntry[];
    sheets: Sheet[];
    potds: Potds;
    createdAt: Date;
    updatedAt: Date;
}

