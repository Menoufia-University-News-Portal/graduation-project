/* eslint-disable prettier/prettier */
import { IsEmail } from "class-validator";

export class CreateSubscriberDto {
    @IsEmail()
    email: string;
}