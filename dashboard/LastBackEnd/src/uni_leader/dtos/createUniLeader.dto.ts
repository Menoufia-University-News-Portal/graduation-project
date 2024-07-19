/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";

/* eslint-disable prettier/prettier */
export class CreateUniLeaderDto{
    @IsString()
    name: string;
    
    @IsString()
    role: string;
}