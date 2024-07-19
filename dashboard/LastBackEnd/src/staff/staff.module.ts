/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from 'src/typeOrm/entities/staff.entity';
import { AuthService } from 'src/auth/auth.service';
import { AdminsService } from 'src/admins/admin.service';
import { JwtService } from '@nestjs/jwt';
import { BlacklistService } from 'src/blacklist/blacklist.service';
import { Admin } from 'src/typeOrm/entities/admin.entity';
import { Permission } from 'src/typeOrm/entities/permission.entity';
import { Faculty } from 'src/typeOrm/entities/faculties.entity';
import { BlackList } from 'src/typeOrm/entities/blacklist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Staff, Admin, Permission, Faculty, BlackList])],
  controllers: [StaffController],
  providers: [StaffService, AuthService, AdminsService, JwtService, BlacklistService]
})
export class StaffModule {}
