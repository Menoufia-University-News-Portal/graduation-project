/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventParams, UpdateEventParams } from 'src/utils/event_types';
import { Event } from 'src/typeOrm/entities/event.entity';
import { Faculty } from 'src/typeOrm/entities/faculties.entity';
import { AuthService } from 'src/auth/auth.service';
import { FacultiesService } from 'src/faculties/faculties.service';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class EventService {
    constructor(@InjectRepository(Event) private eventRepository: Repository<Event>, private facultyService: FacultiesService, private readonly mailService: MailService){}
    
    async addEventToDB(eventDetails: CreateEventParams){
                       /* To work in frontend: */
        AuthService.check();
        if(!AuthService.has_permission("add events")) return "You haven't have the \"add events\" permission";
        eventDetails.link = eventDetails.link.replace('uploads\\', '');
        const newEvent = this.eventRepository.create(eventDetails);
        newEvent.faculties = eventDetails.faculties_ids.map(faculty_id => ({...new Faculty(), faculty_id})); 
        await this.mailService.notifyAll("A new event has recently been added to the website.", "<p> A new <b> event </b> has recently been added to the website. </p>");
        return await this.eventRepository.save(newEvent);

                     /* To work in backend: */
        /*// AuthService.check();
        // if(!AuthService.has_permission("add events")) return "You haven't have the \"add events\" permission";
        let i = 0, s = "";
        const arr = [];
        while(true){
            const ch = eventDetails.faculties_ids[0][i];
            if(ch === ']') break;
            else if(ch >= '0' && ch <= '9') s += ch;
            else if(ch === ','){
                arr.push(parseInt(s));
                s = "";
            }
            i++;
        }
        if(s !== "") arr.push(parseInt(s));
        eventDetails.link = eventDetails.link.replace('uploads\\', '');
        const newEvent = this.eventRepository.create(eventDetails);
        newEvent.faculties = arr.map(faculty_id => ({...new Faculty(), faculty_id})); 
        await this.mailService.notifyAll("A new event has recently been added to the website.", "<p> A new <b> event </b> has recently been added to the website. </p>");
        return await this.eventRepository.save(newEvent);*/
    }

    async updateEvent(id: number, eventDetails: UpdateEventParams){
                                    /* To work in frontend: */
        AuthService.check();
        if(!AuthService.has_permission("update events")) return "You haven't have the \"update events\" permission";                
        const ret = await this.eventRepository.findOne({where: {event_id: id}});
        if(ret == null) return `There is no event with id = ${id}`;
        if(eventDetails.title != undefined) ret.title = eventDetails.title;
        if(eventDetails.description != undefined) ret.description = eventDetails.description;
        if(eventDetails.link != undefined) ret.link = eventDetails.link.replace('uploads\\', '');
        if(eventDetails.faculties_ids != undefined){
            ret.faculties = eventDetails.faculties_ids.map(faculty_id => ({...new Faculty(), faculty_id}));
        }
        return await this.eventRepository.save(ret);

                                    /* To work in backend: */
        /*// AuthService.check();
        //if(!AuthService.has_permission("update events")) return "You haven't have the \"update events\" permission";
        const ret = await this.eventRepository.findOne({where: {event_id: id}});
        if(ret == null) return `There is no event with id = ${id}`;
        if(eventDetails.title != undefined) ret.title = eventDetails.title;
        if(eventDetails.description != undefined) ret.description = eventDetails.description;
        if(eventDetails.link != undefined) ret.link = eventDetails.link.replace('uploads\\', '');
        if(eventDetails.faculties_ids != undefined){
            let i = 0, s = "";
            const arr = [];
            while(true){
                const ch = eventDetails.faculties_ids[0][i];
                if(ch === ']') break;
                else if(ch >= '0' && ch <= '9') s += ch;
                else if(ch === ','){
                    arr.push(parseInt(s));
                    s = "";
                }
                i++;
            }
            if(s !== "") arr.push(parseInt(s));
            ret.faculties = arr.map(faculty_id => ({...new Faculty(), faculty_id}));
           // ret.faculties = eventDetails.faculties_ids.map(faculty_id => ({...new Faculty(), faculty_id}));
        }
        return await this.eventRepository.save(ret);*/
    }

    async findAll(){
      //  AuthService.check();
       // if(!AuthService.has_permission("list events")) return "You haven't have the \"list events\" permission";
        return await this.eventRepository.find({relations: {faculties: true}});
    }

    async viewAll(){
        return await this.eventRepository.find({relations: {faculties: true}});
    }

    async findById(event_id: number){
       // AuthService.check();
        //if(!AuthService.has_permission("view an event")) return "You haven't have the \"view an event\" permission";
        const ret = await this.eventRepository.findOne({where: {event_id}, relations: {faculties: true}});
        return (ret == null ? `There is no event with id = ${event_id}` : ret);
    }

    async deleteEvent(id: number){
        AuthService.check();
        if(!AuthService.has_permission("delete events")) return "You haven't have the \"delete events\" permission";
        const ret = await this.eventRepository.findOne({where:{event_id: id}});
        if(ret == null)  return `There is no event with id = ${id}`;
        await this.eventRepository.delete(id);
        return 'This event is deleted successfully';
    }

    async findLatest(){
        const arr = await this.eventRepository.find({relations: {faculties: true}});
        let cnt = 0;
        const arrRes = [];
        for(let i = arr.length-1; i >= 0; i--){
            cnt++;
            if(cnt>6)  break;
            arrRes.push(arr[i]);
        }
        return arrRes;
      }

    async partShow(){
        const arr = await this.eventRepository.find({relations: {faculties: true}});
        let cnt = 0;
        const arrRes = [];
        for(let i = arr.length-1; i >= 0; i--){
            cnt++;
            if(cnt>12)  break;
            arrRes.push(arr[i]);
        }
        return arrRes;
    }
}
