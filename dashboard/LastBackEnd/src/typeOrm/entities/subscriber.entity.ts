/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('subscribers')
export class Subscriber {
    @PrimaryGeneratedColumn()
    subscriber_id: number;

    @Column({unique: true})
    email: string;
}