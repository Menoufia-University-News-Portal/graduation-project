/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscriber } from 'src/typeOrm/entities/subscriber.entity';
import { CreateSubscriberParams } from 'src/utils/subscriber_types';
import { Repository } from 'typeorm';

@Injectable()
export class SubscriberService {
    constructor(@InjectRepository(Subscriber) private subscriberRepository: Repository<Subscriber>){}

    async addSubscriber(subscriberDetails: CreateSubscriberParams){
       const newSubscriber = this.subscriberRepository.create({...subscriberDetails});
       return await this.subscriberRepository.save(newSubscriber);
    } 
    
    async deleteSubscriber(subscriber_id: number){
        const ret = await this.subscriberRepository.findOne({where:{subscriber_id}});
        if(ret == null)  return `There is no subscriber with id = ${subscriber_id}`;
        await this.subscriberRepository.delete(subscriber_id);
        return 'This subscriber is deleted successfully';
     }

    findAll(): Promise<Subscriber[]>{
        return this.subscriberRepository.find();
    }

    async findById(subscriber_id: number): Promise<any> {
        const ret = await this.subscriberRepository.findOne({where:{subscriber_id}});
        return(ret == null ? `There is no subscriber with id = ${subscriber_id}` : ret); 
    }
    
    async collect_emails(){
        const arr = await this.subscriberRepository.find();
        const emails = [];
        //return arr[0].email;
        for(let i=0; i<arr.length; i++) emails.push(arr[i].email);
        return emails;
    }

}
