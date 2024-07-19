import { IsEmail, IsString, Length } from "class-validator";

export class AuthLoginDto{
    @IsEmail()
    email: string;

    @IsString()
    @Length(7, 20)
    password: string;
}