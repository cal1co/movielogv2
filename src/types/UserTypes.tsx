export type User = {
    username: string;
    email: string;
    password: string;
}

export type UserLogin = {
    usernameOrEmail: string;
    password: string
}