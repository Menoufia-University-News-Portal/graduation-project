import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString, Length } from "class-validator";

export class CreateEventDto{
    @IsString()
    title: string;
    
    @ApiProperty({ example: `This is a multi-linestring`, description: 'Description of the attribute' })
    @IsString()
    @Length(0, 1000000)
    description: string;

    /*@IsString()
    link: string;*/

    @IsArray()
    faculties_ids: number[]
}