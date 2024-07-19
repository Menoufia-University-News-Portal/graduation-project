/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PasswordController } from './password.controller';
import { PasswordService } from './password.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Password } from '../typeOrm/entities/password.entity';
import { AdminModule } from 'src/admins/admin.module';
import { AdminsService } from 'src/admins/admin.service';
import { Admin } from 'src/typeOrm/entities/admin.entity';
import { Permission } from 'src/typeOrm/entities/permission.entity';
import { Faculty } from 'src/typeOrm/entities/faculties.entity';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { BlacklistService } from 'src/blacklist/blacklist.service';
import { BlackList } from 'src/typeOrm/entities/blacklist.entity';
import { MailService } from 'src/mail/mail.service';
import { SubscriberService } from 'src/subscriber/subscriber.service';
import { Subscriber } from 'src/typeOrm/entities/subscriber.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Password, Admin, Permission, Faculty, BlackList, Subscriber]), AdminModule, /*forwardRef(() => MailModule)*/],
    controllers: [PasswordController],
    providers: [PasswordService, AdminsService, AuthService, JwtService, BlacklistService, MailService, SubscriberService],
})
export class PasswordModule {}
