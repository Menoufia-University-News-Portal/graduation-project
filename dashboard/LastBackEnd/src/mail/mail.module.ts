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
      host: process.env.EMAIL_HOST,
      auth: {
        user: process.env.USER, 
        pass: process.env.PASS 
      }
    }
  })],
  controllers: [MailController],
  providers: [MailService, SubscriberService]
})
export class MailModule {}
