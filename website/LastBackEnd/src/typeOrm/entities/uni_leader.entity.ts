/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('uni_leaders')
export class UniLeader{
    @PrimaryGeneratedColumn()
    leader_id: number;

    @Column()
    name: string;

    @Column()
    role: string;

    @Column()
    link: string;
}