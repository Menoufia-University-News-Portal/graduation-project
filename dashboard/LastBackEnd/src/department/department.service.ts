/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from 'src/typeOrm/entities/department.entity';
import { Staff } from 'src/typeOrm/entities/staff.entity';
import { CreateDepartmentParams, UpdateDepartmentParams } from 'src/utils/department_types';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class DepartmentService {
    constructor(@InjectRepository(Department) private departmentRepository: Repository<Department>){}
    
    async addDepartmentToDB(departmentDetails: CreateDepartmentParams){
        AuthService.check();
        if(!AuthService.has_permission("add departments")) return "You haven't have the \"add departments\" permission";
        const newDepartment: any = this.departmentRepository.create({ ...departmentDetails });
        const check_department = await this.departmentRepository.findOne({where: {name: departmentDetails.name}});
        if(check_department) return 'This department is already exist';
        newDepartment.staff = departmentDetails.staff.map(staff_id => ({...new Staff(), staff_id}));
        return await this.departmentRepository.save(newDepartment);
    }

    async updateDepartment(id: number, updateDepartmentParams: UpdateDepartmentParams){
        AuthService.check();
        if(!AuthService.has_permission("update departments")) return "You haven't have the \"update departments\" permission";
        const ret: any = await this.departmentRepository.findOne({where: {department_id: id}});
        if(ret == null) return `There is no department with id = ${id}`;
        if(updateDepartmentParams.name != undefined){
            const check_department = await this.departmentRepository.findOne({where: {name: updateDepartmentParams.name}});
            if(check_department && check_department.department_id != id) return 'This department is already exist';
            ret.name = updateDepartmentParams.name;
        }
        if(updateDepartmentParams.staff != undefined){
            ret.staff = updateDepartmentParams.staff.map(staff_id => ({...new Staff(), staff_id})); 
        }
        return await this.departmentRepository.save(ret);
    }

    async findAll(){
       // AuthService.check();
       // if(!AuthService.has_permission("list departments")) return "You haven't have the \"list departments\" permission";
        return await this.departmentRepository.find({relations: {staff: true}});
    }

    async findById(department_id: number){
       // AuthService.check();
       // if(!AuthService.has_permission("view a department")) return "You haven't have the \"view a department\" permission";
        const ret = await this.departmentRepository.findOne({where: {department_id}, relations: {staff: true}});
        return (ret == null ? `There is no department with id = ${department_id}` : ret);
    }

    async deleteDepartment(id: number){
        AuthService.check();
        if(!AuthService.has_permission("delete departments")) return "You haven't have the \"delete departments\" permission";
        const ret = await this.departmentRepository.findOne({where:{department_id: id}});
        if(ret == null)  return `There is no department with id = ${id}`;
        await this.departmentRepository.delete(id);
        return 'This department is deleted successfully';
    }
}
