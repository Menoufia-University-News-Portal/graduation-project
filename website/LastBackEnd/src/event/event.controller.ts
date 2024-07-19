// here last version

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UploadedFile, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateEventDto } from './event_dtos/createEvent.dto';
import { EventService } from './event.service';
import { UpdateEventDto } from './event_dtos/updateEvent.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';

@Controller('event')
export class EventController {
    constructor(private eventService: EventService){}

    /*@Post('/add')
    async create(@Body() dto: CreateEventDto){
        return await this.eventService.addEventToDB(dto);
    }*/

    @Post('/add')
    @UsePipes(new ValidationPipe({ transform: true }))
    @UseInterceptors(FileInterceptor('link', {
        storage: diskStorage({
            // Destination storage path details
            destination: (req: any, file: any, cb: any) => {
                const uploadPath = './uploads';
                // Create folder if doesn't exist
                if (!existsSync(uploadPath)) {
                    mkdirSync(uploadPath);
                }
                cb(null, uploadPath);
            }, // to add image extension of the uploaded image automatically
            filename: (req, file, cb) => {
                // Generating a 32 random chars long string
                const randomName = Array(32).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
                //Calling the callback passing the random name generated with the original extension name
                cb(null, `${randomName}${extname(file.originalname)}`);
            },
        }),
    }))
    async create(@UploadedFile() file: any, @Body() dto: CreateEventDto) {
    // const links_paths = files.links.map(file => file.path);
        return await this.eventService.addEventToDB({ ...dto, link: file.path });
    }

    @Patch('/update/:id')
    @UsePipes(new ValidationPipe({ transform: true }))
    @UseInterceptors(FileInterceptor('link', {
        storage: diskStorage({
            // Destination storage path details
            destination: (req: any, file: any, cb: any) => {
                const uploadPath = './uploads';
                // Create folder if doesn't exist
                if (!existsSync(uploadPath)) {
                mkdirSync(uploadPath);
                }
                cb(null, uploadPath);
            }, // to add image extension of the uploaded image automatically
            filename: (req, file, cb) => {
                // Generating a 32 random chars long string
                const randomName = Array(32).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
                //Calling the callback passing the random name generated with the original extension name
                cb(null, `${randomName}${extname(file.originalname)}`);
            },
        }),
    }))
    async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateEventDto, @UploadedFile() file?: any){
       // console.log(file?.path);
        return await this.eventService.updateEvent(id, {...payload, link: file?.path});
    }

    @Get('/list')
    async list(){
        return await this.eventService.findAll();
    }

    @Get('/viewAll')
    async viewWithoutAuthorization(){
        return await this.eventService.viewAll();
    }

    @Get('/:id')
    async view(@Param('id', ParseIntPipe) id: number){
        return await this.eventService.findById(id);
    }

    @Delete('/delete/:id')
    async delete(@Param('id') id: number){
        return await this.eventService.deleteEvent(id);
    }

    @Get('/latest/events')
    async viewLatest(){
      return await this.eventService.findLatest();
    } 

    @Get('/display/12')
    async partDisplay(){
      return await this.eventService.partShow();
    }

}