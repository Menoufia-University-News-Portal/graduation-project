/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './typeOrm/entities/admin.entity';
import { AdminModule } from './admins/admin.module';
import { AuthModule } from './auth/auth.module';
import { Permission } from './typeOrm/entities/permission.entity';
import { PermissionModule } from './permission/permission.module';
import { PasswordModule } from './password/password.module';
import { Password } from './typeOrm/entities/password.entity';
import { FacultiesModule } from './faculties/faculties.module';
import { Country } from './typeOrm/entities/country.entity';
import { Timezone } from './typeOrm/entities/timezone.entity';
import { CountryModule } from './country/country.module';
import { TimezoneModule } from './timezone/timezone.module';
import { EventModule } from './event/event.module';
import { Event } from './typeOrm/entities/event.entity';
import { NewsModule } from './news/news.module';
import { News } from './typeOrm/entities/news.entity';
import { Department } from './typeOrm/entities/department.entity';
import { DepartmentModule } from './department/department.module';
import { Staff } from './typeOrm/entities/staff.entity';
import { StaffModule } from './staff/staff.module';
import { Faculty } from './typeOrm/entities/faculties.entity';
import { BlacklistModule } from './blacklist/blacklist.module';
import { BlackList } from './typeOrm/entities/blacklist.entity';
import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AuthMiddleware } from './auth/auth.middleware'; 
import { ComersNews } from './typeOrm/entities/comers_news.entity';
import { ComersNewsModule } from './comers_news/comers_news.module';
import { SectorHeadNews } from './typeOrm/entities/sector_head_news.entity';
import { SectorHeadNewsModule } from './sector_head_news/sector_head_news.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UniLeader } from './typeOrm/entities/uni_leader.entity';
import { UniLeaderModule } from './uni_leader/uni_leader.module';
import { MailModule } from './mail/mail.module';
import { Subscriber } from './typeOrm/entities/subscriber.entity';
import { SubscriberModule } from './subscriber/subscriber.module';
import { GalleryModule } from './gallery/gallery.module';
import { Gallery } from './typeOrm/entities/gallery.entity';

@Module({
  imports: [ AdminModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'final_graduation_project_db',
      entities: [Admin, Permission, Password, Faculty, Country, Timezone, Event, News, Department, Staff, BlackList, ComersNews, SectorHeadNews, UniLeader, Gallery, Subscriber],
      synchronize: true,
    }),
    AuthModule,
    PermissionModule,
    PasswordModule,
    FacultiesModule,
    CountryModule,
    TimezoneModule,
    EventModule,
    NewsModule,
    DepartmentModule,
    StaffModule,
    BlacklistModule,
    ComersNewsModule,
    SectorHeadNewsModule,
    ServeStaticModule.forRoot({ //To show the uploads that are in news_uploads & uploads & ...
        rootPath: join(__dirname, '..', 'news_uploads'),
        renderPath: '/news_uploads',
      },
      {
        rootPath: join(__dirname, '..', 'uploads'),
        renderPath: '/uploads',
      },
      {
        rootPath: join(__dirname, '..', 'comersNews_uploads'),
        renderPath: '/comersNews_uploads',
      },
      {
        rootPath: join(__dirname, '..', 'sectorHeadNews_uploads'),
        renderPath: '/sectorHeadNews_uploads',
      },
      {
        rootPath: join(__dirname, '..', 'uniLeaders_uploads'),
        renderPath: '/uniLeaders_uploads',
      },
      {
        rootPath: join(__dirname, '..', 'gallery_uploads'),
        renderPath: '/gallery_uploads',
      },
    ),
    UniLeaderModule,
    MailModule,
    SubscriberModule,
    GalleryModule,
   
    //ServeStaticModule.forRoot({rootPath: join(__dirname, '..', 'news_uploads')}, {rootPath: join(__dirname, '..', 'uploads')}, {rootPath: join(__dirname, '..', 'comersNews_uploads')}, {rootPath: join(__dirname, '..', 'sectorHeadNews_uploads')})
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService]
})
export class AppModule  implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
