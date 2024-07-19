/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Faculty } from "./faculties.entity";

@Entity('news')
export class News{
    @PrimaryGeneratedColumn()
    news_id: number;

    @Column()
    title: string;

    @Column({type: 'longtext'})
    description: string;

    @Column()
    link: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ManyToMany(() => Faculty, (faculties) => faculties.news, {onDelete: 'CASCADE'})
    faculties: Faculty[];
}