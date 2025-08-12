interface IAuthState {
    isLoggedIn?: boolean,
    username: string | null,
    isLead: boolean,
    name: string | null,
    phone: number | null,
    email: string | null,
    regNumber: string | null,
    branch: string | null,
    batch: number | null,
    password?: string | null,
    verified: boolean,
    _id: string | null,
    createdAt: Date | null,
    updatedAt: Date | null,
}

