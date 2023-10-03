import { hash, compare } from "bcrypt";
import { Service } from "typedi";
import { HttpException } from "@exceptions/HttpException";
import { User } from "@/interfaces/user.interface";
import { UserModel } from "@/models/user.model";
import { Otp } from "@/interfaces/otp.interface";
import { OtpModel } from "@/models/otp.model";
import { generateOtp, verifyOtp } from "@/utils/Otp";
import { AuthInterface } from "@/interfaces/auth.interface";
import { userToken } from "@/utils/createToken";
import { OtpType } from "@/enums/otp-enum";
import { SignInDto, SignUpDto, VerifyDto } from "@/dtos/auth.dto";
import { welcometemp } from "@/templates/welcome";
import { sendEmail } from "@/utils/sendEmail";
import { otptemp } from "@/templates/verify";

@Service()
export class AuthService {
    private async findUserByEmail(email: string): Promise<User> {
        return await UserModel.findOne({ email });
    }

    public async signup(data: SignUpDto): Promise<User> {
        const existingUserByEmail: User = await this.findUserByEmail(data.email);
        if (existingUserByEmail) {
            throw new HttpException(409, "Email already in use");
        };

        const hashPassword = await hash(data.password, 10);
        const createdUserData: User = await UserModel.create({
            ...data,
            password: hashPassword
        });

        const tokenExpiration = new Date();
        tokenExpiration.setMinutes(tokenExpiration.getMinutes() + 10);

        const otp = generateOtp(6);
        const newOtp = new OtpModel({
            user: createdUserData._id,
            type: OtpType.VERIFICATION,
            otp,
            otpExpiration: tokenExpiration,
        });
        await newOtp.save();

        const emailTemplate = otptemp(otp);
        const to = data.email;
        const subject = "Verification OTP";
        const html = emailTemplate;

        await sendEmail(to, subject, html);

        return createdUserData;
    }

    public async verifySignUp(data: VerifyDto): Promise<User> {
        const user = await UserModel.findOne({ email: data.email });
        if (!user) {
            throw new HttpException(404, "User not found");
        }

        const otpRecord = await OtpModel.findOne({ user: user._id, type: OtpType.VERIFICATION });
        if (!otpRecord) {
            throw new HttpException(404, "OTP record not found");
        }

        const expirationDate = new Date(otpRecord.expiration);

        if (expirationDate < new Date()) {
            throw new HttpException(400, `OTP has expired`);
        }


        const isOtpValid = await verifyOtp(user._id, data.otp, OtpType.VERIFICATION);
        if (!isOtpValid) {
            throw new HttpException(400, "Invalid OTP");
        }

        const updatedUser: User = await UserModel.findByIdAndUpdate(
            user._id,
            {
                isEmailVerified: true,
            },
            { new: true }
        );
        await otpRecord.deleteOne();

        const emailTemplate = welcometemp(user.username);
        const to = user.email;
        const subject = "Welcom";
        const html = emailTemplate;

        await sendEmail(to, subject, html);

        return updatedUser;
    }

    public async signin(data: SignInDto): Promise<AuthInterface> {
        const { email, password } = data;

        const user: User = await this.findUserByEmail(email);
        if (!user) {
            throw new HttpException(401, "Invalid Email");
        }

        if (!user.isEmailVerified) {
            throw new HttpException(401, "Email is not verified");
        }

        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
            throw new HttpException(401, "Invalid Password");
        }

        const token = await userToken(user);
        const response: AuthInterface = {
            user: user,
            accessToken: token.accessToken,
        };

        return response;
    }
}