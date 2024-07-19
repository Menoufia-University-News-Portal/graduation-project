/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Faculty } from "./faculties.entity";

@Entity('sector_head_news')
export class SectorHeadNews{
    @PrimaryGeneratedColumn()
    sector_head_news_id: number;

    @Column()
    title: string;

    @Column({type: 'longtext'})
    description: string;

    @Column()
    link: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ManyToMany(() => Faculty, (faculties) => faculties.sector_head_news, {onDelete: 'CASCADE'})
    faculties: Faculty[];
}