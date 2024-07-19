/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService){}

    /*@Get()
    sendMail(){
        return this.mailService.sendMail();
    }*/

    @Get('notify')
    sendMail(){
        return this.mailService.notifyAll("This email is to test notifications....", "<b> This email is to test notifications.... <b>");
    }   
}
