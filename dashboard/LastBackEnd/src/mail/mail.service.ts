/* eslint-disable prettier/prettier */
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { PasswordService } from 'src/password/password.service';
import { SubscriberService } from 'src/subscriber/subscriber.service';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService, private readonly subscriberService: SubscriberService){}

    async sendMail(sub: string, txt: string, htm: string){
        await this.mailerService.sendMail({
            to: PasswordService.target_email,
            subject: sub,
            text: txt,
            html: htm
        })
        return 'The email is sent successfully';
    }

    async notifyAll(txt: string, htm: string){
        //console.log((await this.subscriberService.collect_emails()).length);
        if((await this.subscriberService.collect_emails()).length != 0){
            this.mailerService.sendMail({
                to: await this.subscriberService.collect_emails(),
                subject: "Notification from UNI INSIGHT",
                text: txt,
                html: htm
            })
        }
       // return 'The notification is sent to all subscribers successfully';
    }
}
