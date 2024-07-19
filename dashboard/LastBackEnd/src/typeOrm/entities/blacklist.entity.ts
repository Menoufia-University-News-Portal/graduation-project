/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('blacklist')
export class BlackList{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;
}