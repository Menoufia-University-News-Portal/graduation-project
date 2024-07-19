/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { Department } from './department.entity';
import { Staff } from './staff.entity';
import { News } from './news.entity';
import { Event } from './event.entity';
import { Admin } from './admin.entity';
import { ComersNews } from './comers_news.entity';
import { SectorHeadNews } from './sector_head_news.entity';
  
  @Entity({ name: 'faculties' })
  export class Faculty {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    faculty_id: number;
  
    @Column()
    name: string;
  
    @Column()
    dean_name: string;

    @OneToMany(() => Department, (departments) => departments.faculty)
    departments: Department[]

    @OneToMany(() => Staff, (staff) => staff.faculty)
    staff: Staff[]

    @ManyToMany(() => News, (news) => news.faculties, {onDelete: 'CASCADE'})
    @JoinTable({
        name: 'faculties_news',
        joinColumn:{
            name: 'faculty_id',
            referencedColumnName: 'faculty_id',
            foreignKeyConstraintName: 'faculties_news_faculty_id'
        },
        inverseJoinColumn:{
            name: 'news_id',
            referencedColumnName: 'news_id',
            foreignKeyConstraintName: 'faculties_news_news_id'
        }
    })
    news: News[];

    @ManyToMany(() => Event, (events) => events.faculties, {onDelete: 'CASCADE'})
    @JoinTable({
        name: 'faculties_events',
        joinColumn:{
            name: 'faculty_id',
            referencedColumnName: 'faculty_id',
            foreignKeyConstraintName: 'faculties_events_faculty_id'
        },
        inverseJoinColumn:{
            name: 'event_id',
            referencedColumnName: 'event_id',
            foreignKeyConstraintName: 'faculties_events_event_id'
        }
    })
    events: Event[];

    @ManyToMany(() => Admin, (admins) => admins.faculties, {onDelete: 'CASCADE'})
    admins: Admin[];

    @ManyToMany(() => ComersNews, (comers_news) => comers_news.faculties, {onDelete: 'CASCADE'})
    @JoinTable({
        name: 'faculties_comers_news',
        joinColumn:{
            name: 'faculty_id',
            referencedColumnName: 'faculty_id',
            foreignKeyConstraintName: 'faculties_comers_news_faculty_id'
        },
        inverseJoinColumn:{
            name: 'comers_news_id',
            referencedColumnName: 'comers_news_id',
            foreignKeyConstraintName: 'faculties_comers_news_comers_news_id'
        }
    })
    comers_news: ComersNews[];

    @ManyToMany(() => SectorHeadNews, (sector_head_news) => sector_head_news.faculties, {onDelete: 'CASCADE'})
    @JoinTable({
        name: 'faculties_sector_head_news',
        joinColumn:{
            name: 'faculty_id',
            referencedColumnName: 'faculty_id',
            foreignKeyConstraintName: 'faculties_sector_head_news_faculty_id'
        },
        inverseJoinColumn:{
            name: 'sector_head_news_id',
            referencedColumnName: 'sector_head_news_id',
            foreignKeyConstraintName: 'faculties_sector_head_news_sector_head_news_id'
        }
    })
    sector_head_news: SectorHeadNews[];
  }