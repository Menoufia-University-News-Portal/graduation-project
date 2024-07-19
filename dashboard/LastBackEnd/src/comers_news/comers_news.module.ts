import { Module } from '@nestjs/common';
import { ComersNewsController } from './comers_news.controller';
import { ComersNewsService } from './comers_news.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComersNews } from 'src/typeOrm/entities/comers_news.entity';
import { Admin } from 'src/typeOrm/entities/admin.entity';
import { BlackList } from 'src/typeOrm/entities/blacklist.entity';
import { Permission } from 'src/typeOrm/entities/permission.entity';
import { Faculty } from 'src/typeOrm/entities/faculties.entity';
import { BlacklistService } from 'src/blacklist/blacklist.service';
import { AuthService } from 'src/auth/auth.service';
import { AdminsService } from 'src/admins/admin.service';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { SubscriberService } from 'src/subscriber/subscriber.service';
import { Subscriber } from 'src/typeOrm/entities/subscriber.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ComersNews, Admin, BlackList, Permission, Faculty, Subscriber])],
  controllers: [ComersNewsController],
  providers: [ComersNewsService, AuthService, AdminsService, JwtService, BlacklistService, MailService, SubscriberService]
})
export class ComersNewsModule {}
