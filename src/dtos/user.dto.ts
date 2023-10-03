import { IsString, IsEmail, IsNotEmpty, IsBoolean, MinLength } from 'class-validator';

export class UpdateUserDto {
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
