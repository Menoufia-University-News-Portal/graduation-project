/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { SubscriberService } from './subscriber.service';
import { CreateSubscriberDto } from './dtos/createSubscriber.dto';

@Controller('subscriber')
export class SubscriberController {
    constructor(private readonly subscriberService: SubscriberService){}

    @Post('/add')
    async create(@Body() dto: CreateSubscriberDto){
        return await this.subscriberService.addSubscriber(dto);
    }

    @Delete('/delete/:id')
    async delete(@Param('id') id: number){
        return await this.subscriberService.deleteSubscriber(id);
    }

    @Get('/list')
    async list(){
        return await this.subscriberService.findAll();
    }

    @Get('/view/:id')
    async view(@Param('id', ParseIntPipe) id: number){
        return await this.subscriberService.findById(id);
    }

    /*@Get('/emails')
    async collect(){
        return await this.subscriberService.collect_emails();
    }*/
}
