import { OtpType } from "@/enums/otp-enum";
import { OtpModel } from "@/models/otp.model";

export const generateOtp = function (len: number): number {
    const min = Math.pow(10, len - 1);
    const max = Math.pow(10, len) - 1;

    return Math.floor(min + Math.random() * (max - min + 1));
};


export const verifyOtp = async function (user: any, code: number, type: OtpType): Promise<number | null> {
    const existOtp = await OtpModel.findOne({
        where: {
            user,
            code,
            type,
        },
    });

    const currentDate = new Date();

    if (!existOtp || new Date(existOtp.expiration) < currentDate) {
        return null;
    }

    return existOtp.id;
};