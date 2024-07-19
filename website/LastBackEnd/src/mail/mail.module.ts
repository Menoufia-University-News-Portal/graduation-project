/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { PasswordModule } from 'src/password/password.module';
import { SubscriberService } from 'src/subscriber/subscriber.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscriber } from 'src/typeOrm/entities/subscriber.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subscriber]), PasswordModule, MailerModule.forRoot({
    transport: {
      host: 'smtp.gmail.com',
      auth: {
        user: 'uniinsight41@gmail.com', //user: 'alaahathout1@gmail.com', ==> = from  
        pass: 'pwfkamnjhdfwkxgi' //pass: 'ydlfchatxjzbhtie' ==> = password of the app in google settings
      }
    }
  })],
  controllers: [MailController],
  providers: [MailService, SubscriberService]
})
export class MailModule {}
