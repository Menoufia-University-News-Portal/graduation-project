import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/typeOrm/entities/event.entity';
import { AuthService } from 'src/auth/auth.service';
import { AdminsService } from 'src/admins/admin.service';
import { JwtService } from '@nestjs/jwt';
import { BlacklistService } from 'src/blacklist/blacklist.service';
import { Admin } from 'src/typeOrm/entities/admin.entity';
import { Permission } from 'src/typeOrm/entities/permission.entity';
import { Faculty } from 'src/typeOrm/entities/faculties.entity';
import { BlackList } from 'src/typeOrm/entities/blacklist.entity';
import { FacultiesService } from 'src/faculties/faculties.service';
import { MailService } from 'src/mail/mail.service';
import { SubscriberService } from 'src/subscriber/subscriber.service';
import { Subscriber } from 'src/typeOrm/entities/subscriber.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Admin, Permission, Faculty, BlackList, Subscriber])],
  controllers: [EventController],
  providers: [EventService, AuthService, AdminsService, JwtService, BlacklistService, FacultiesService, MailService, SubscriberService]
})
export class EventModule {}
