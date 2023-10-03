import { NextFunction, Request, Response } from "express";
import { Container } from "typedi";
import { AuthService } from "@/services/auth.service";
import { User } from "@/interfaces/user.interface";
import { AuthInterface } from "@/interfaces/auth.interface";
import { SignInDto, SignUpDto, VerifyDto } from "@/dtos/auth.dto";

export class AuthController {
    public auth = Container.get(AuthService);

    public signup = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userData: SignUpDto = req.body;
            const signUpUserData: User = await this.auth.signup(userData);

            res.status(201).json({ data: signUpUserData, message: "signup" });
        } catch (error) {
            next(error);
        }
    };

    public verify = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data: VerifyDto = req.body;
            const verifiedUser: User = await this.auth.verifySignUp(data);

            res.status(201).json({ data: verifiedUser, message: "verified" });
        } catch (error) {
            next(error);
        }
    };

    public signin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data: SignInDto = req.body;
            const authResponse: AuthInterface = await this.auth.signin(data);

            res.status(200).json({ data: authResponse, message: "Signin successful" });
        } catch (error) {
            next(error);
        }
    };
}