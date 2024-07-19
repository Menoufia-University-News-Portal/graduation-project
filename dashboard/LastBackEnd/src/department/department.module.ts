/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from 'src/typeOrm/entities/department.entity';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { BlacklistService } from 'src/blacklist/blacklist.service';
import { AdminsService } from 'src/admins/admin.service';
import { BlackList } from 'src/typeOrm/entities/blacklist.entity';
import { Admin } from 'src/typeOrm/entities/admin.entity';
import { Permission } from 'src/typeOrm/entities/permission.entity';
import { Faculty } from 'src/typeOrm/entities/faculties.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Department, BlackList, Admin, Permission, Faculty])],
  controllers: [DepartmentController],
  providers: [DepartmentService, AuthService, JwtService, BlacklistService, AdminsService]
})
export class DepartmentModule {}
