/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from 'src/typeOrm/entities/news.entity';
import { AuthService } from 'src/auth/auth.service';
import { AdminsService } from 'src/admins/admin.service';
import { JwtService } from '@nestjs/jwt';
import { BlacklistService } from 'src/blacklist/blacklist.service';
import { Admin } from 'src/typeOrm/entities/admin.entity';
import { BlackList } from 'src/typeOrm/entities/blacklist.entity';
import { Permission } from 'src/typeOrm/entities/permission.entity';
import { Faculty } from 'src/typeOrm/entities/faculties.entity';
import { MailService } from 'src/mail/mail.service';
import { SubscriberService } from 'src/subscriber/subscriber.service';
import { Subscriber } from 'src/typeOrm/entities/subscriber.entity';

@Module({
  imports: [TypeOrmModule.forFeature([News, Admin, BlackList, Permission, Faculty, Subscriber])],
  controllers: [NewsController],
  providers: [NewsService, AuthService, AdminsService, JwtService, BlacklistService, MailService, SubscriberService]
})
export class NewsModule {}
