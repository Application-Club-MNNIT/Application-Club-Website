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
        verified: boolean | null,
        lastSubmissionTimestamp: number | null,
        lastRequestTimestamp: number | null,
        submissions: any[] | null
    },
    gfg: {
        verified: boolean | null,
        lastSubmissionTimestamp: number | null,
        lastRequestTimestamp: number | null,
        submissions: any[] | null
    },
    codeforces: {
        verified: boolean | null,
        lastSubmissionTimestamp: number | null,
        lastRequestTimestamp: number | null,
        submissions: any[] | null
    },
    github: {
        verified: boolean | null
    },
    verified: boolean,
    _id: string | null,
    createdAt: Date | null,
    updatedAt: Date | null,
}

