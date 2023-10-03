import { OtpType } from "@/enums/otp-enum";
import { User } from "./user.interface";

export interface Otp {
    id?: number;
    code: number;
    type: OtpType;
    expiration: string;
    user: User;
}