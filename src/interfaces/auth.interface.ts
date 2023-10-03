import { User } from "./user.interface";

export interface AuthInterface {
    user: User;
    accessToken: string;
    refreshToken?: string;
}