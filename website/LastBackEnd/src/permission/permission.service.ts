/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Admin } from 'src/typeOrm/entities/admin.entity';
import { Permission } from 'src/typeOrm/entities/permission.entity';
import { CreatePermissionParams, UpdatePermissionParams } from 'src/utils/permission_types';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionService {
    constructor(@InjectRepository(Permission) private permissionRepository: Repository<Permission>,@InjectRepository(Admin) private adminRepository: Repository<Admin>){}

    async addPermission(permissionDetails: CreatePermissionParams){
        AuthService.check();
        if(!AuthService.has_permission("add permissions")) return "You haven't have the \"add permissions\" permission";
        const permission: any = this.permissionRepository.create({...permissionDetails});
        permission.admins = permissionDetails.admins_ids.map(admin_id => ({...new Admin(), admin_id})); 
        const check_permission = await this.permissionRepository.findOne({where: {type: permission.type}});
        if(check_permission) return 'This permission is already exist';
       /* let active_admins = [];
        for (let index = 0; index < permission.admins.length; index++) {
            const current_admin_id = permission.admins[index].admin_id;
            const admin = await this.adminService.findById(current_admin_id);
            if(admin.is_active) active_admins.push(current_admin_id);
        }
        permission.admins = active_admins;
        console.log(permission);*/
        return await this.permissionRepository.save(permission);
    }

    async updatePermission(id: number, updatePermissionParams: UpdatePermissionParams) {
        AuthService.check();
        if(!AuthService.has_permission("update permissions")) return "You haven't have the \"update permissions\" permission";
        try {
            const permission = await this.permissionRepository.findOneOrFail({where:{permission_id:id}});
    
            if (updatePermissionParams.type !== undefined) {
                const existingPermission = await this.permissionRepository.findOne({ where: { type: updatePermissionParams.type } });
                if (existingPermission && existingPermission.permission_id !== permission.permission_id) {
                    return 'This permission type is already in use';
                }
                permission.type = updatePermissionParams.type;
            }
    
            if (updatePermissionParams.admins_ids !== undefined) {
                permission.admins = await Promise.all(updatePermissionParams.admins_ids.map(async adminId => {
                    const admin = await this.adminRepository.findOne({where:{admin_id:adminId}});
                    if (!admin) {
                        throw new Error(`Admin with ID ${adminId} not found`);
                    }
                    return admin;
                }));
            }
    
            return await this.permissionRepository.save(permission);
        } catch (error) {
            console.error('Error updating permission:', error);
            return 'Error updating permission';
        }
    }

    async listPermissions(){
        //AuthService.check();
        //if(!AuthService.has_permission("list permissions")) return "You haven't have the \"list permissions\" permission";
        return await this.permissionRepository.find({relations:{admins: true}});
    }

    // Problem.................................
    async viewPermission(permission_id: number): Promise<any>{
       // AuthService.check();
       // if(!AuthService.has_permission("view a permission")) return "You haven't have the \"view a permission\" permission";
        const ret = await this.permissionRepository.findOne({where: {permission_id}, relations: {admins: true}});
        return(ret == null ? `There is no permission with id = ${permission_id}` : ret);
    }

    async deletePermission(id: number){
        //AuthService.check();
        if(!AuthService.entered_successful_login || AuthService.exception_happened || !AuthService.autherized){
            return 'You are not autherized';
        }
        if(!AuthService.has_permission("delete permissions")) return "You haven't have the \"delete permissions\" permission";
        const ret = await this.permissionRepository.findOne({where:{permission_id: id}});
        if(ret == null)  return `There is no permission with id = ${id}`;
        await this.permissionRepository.delete(id);
        console.log('This permission is deleted successfully');
        return 'This permission is deleted successfully';
    }

    async getUserRoles(permission_id: number){
        //const user = await this.adminService.findById(admin_id);
        const type= await this.viewPermission(permission_id)
        if (type) {
          return await type.type; 
        }
        return [];
    }
}
