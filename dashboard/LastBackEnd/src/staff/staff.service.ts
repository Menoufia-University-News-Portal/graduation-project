/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from 'src/typeOrm/entities/staff.entity';
import { CreateStaffParams, UpdateStaffParams } from 'src/utils/staff_types';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class StaffService {
    constructor(@InjectRepository(Staff) private staffRepository: Repository<Staff>){}
    
    async addStaffToDB(staffDetails: CreateStaffParams){
        AuthService.check();
        if(!AuthService.has_permission("add staff")) return "You haven't have the \"add staff\" permission";
        const newStaff  = this.staffRepository.create({ ...staffDetails });
        return await this.staffRepository.save(newStaff);
    }

    async updateStaff(id: number, updateStaffParams: UpdateStaffParams){
        AuthService.check();
        if(!AuthService.has_permission("update staff")) return "You haven't have the \"update staff\" permission";
        const ret = await this.staffRepository.findOne({where: {staff_id: id}});
        if(ret == null) return `There is no staff with id = ${id}`;
        await this.staffRepository.update(id, updateStaffParams);
        return updateStaffParams;
    }

    async findAll(){
        //AuthService.check();
       // if(!AuthService.has_permission("list staff")) return "You haven't have the \"list staff\" permission";
        return await this.staffRepository.find();
    }

    async findById(id: number){
       // AuthService.check();
       // if(!AuthService.has_permission("view a staff")) return "You haven't have the \"view a staff\" permission";
        const ret = await this.staffRepository.findOne({where: {staff_id: id}});
        return (ret == null ? `There is no staff with id = ${id}`: ret);
    }

    async deleteStaff(id: number){
        AuthService.check();
        if(!AuthService.has_permission("delete staff")) return "You haven't have the \"delete staff\" permission";
        const ret = await this.staffRepository.findOne({where:{staff_id: id}});
        if(ret == null)  return `There is no staff with id = ${id}`;
        await this.staffRepository.delete(id);
        return 'This staff is deleted successfully';
    }
}
