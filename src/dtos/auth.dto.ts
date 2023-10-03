import { IsString, IsEmail, IsNotEmpty, IsBoolean, MinLength } from 'class-validator';

export class SignUpDto {
    @IsString()
    @IsNotEmpty()
    fullname: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @MinLength(8)
    password: string;
}

export class VerifyDto {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(6)
    otp: number;
}

export class SignInDto {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;
}