import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminsService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/typeOrm/entities/admin.entity';
import { Permission } from 'src/typeOrm/entities/permission.entity';
import { Faculty } from 'src/typeOrm/entities/faculties.entity';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { BlacklistService } from 'src/blacklist/blacklist.service';
import { BlackList } from 'src/typeOrm/entities/blacklist.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Admin, Permission,Faculty, BlackList])],
    controllers: [AdminController],
    providers: [AdminsService, AuthService, JwtService, BlacklistService],
    exports: [AdminsService],
})
export class AdminModule{

}