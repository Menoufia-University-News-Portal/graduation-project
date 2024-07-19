/* eslint-disable prettier/prettier */
import { IsArray, IsOptional, IsString, Length } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class UpdateHeadNewsDto{
    @IsOptional()   
    @IsString()
    title: string;
    
    @IsOptional()
    @ApiProperty({ example: `This is a multi-linestring`, description: 'Description of the attribute' })
    @IsString()
    @Length(0, 1000000)
    description: string;

    /*@IsOptional()
    @IsString()
    link: string;*/

    @IsOptional()
    @IsArray()
    faculties_ids: number[]
}