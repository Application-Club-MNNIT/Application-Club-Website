interface IAuthState {
    isLoggedIn?: boolean,
    username: string | null,
    name: string | null,
    phone: number | null,
    email: string | null,
    regNumber: string | null,
    branch: string | null,
    batch: number | null,
    leetcode: {
        username?: string | null;
        verified: boolean | null,
        lastSubmissionTimestamp: number | null,
        lastRequestTimestamp: number | null,
        submissions: any[] | null
    },
    gfg: {
        username?: string | null;
        verified: boolean | null,
        lastSubmissionTimestamp: number | null,
        lastRequestTimestamp: number | null,
        submissions: any[] | null
    },
    codeforces: {
        username?: string | null;
        verified: boolean | null,
        lastSubmissionTimestamp: number | null,
        lastRequestTimestamp: number | null,
        submissions: any[] | null
    },
    github: {
        username?: string | null;
        verified: boolean | null
    },
    verified: boolean,
    _id: string | null,
    createdAt: Date | null,
    updatedAt: Date | null,
}

