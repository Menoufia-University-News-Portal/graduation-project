/* eslint-disable prettier/prettier */
import { IsArray, IsString, Length } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateHeadNewsDto{
    @IsString()
    title: string;
    
    @ApiProperty({ example: `This is a multi-linestring`, description: 'Description of the attribute' })
    @IsString()
    @Length(0, 1000000)
    description: string;

   /* @IsString()
    link: string;*/

    @IsArray()
    faculties_ids: number[]
}