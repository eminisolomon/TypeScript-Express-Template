export interface User {
    _id?: string;
    fullname: string;
    email: string;
    username: string;
    role: string;
    image: string;
    isEmailVerified: boolean;
    password: string;
}