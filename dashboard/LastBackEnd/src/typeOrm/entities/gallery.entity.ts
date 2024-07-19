/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('gallery')
export class Gallery{
    @PrimaryGeneratedColumn()
    image_id: number;

    @Column()
    link: string;
}