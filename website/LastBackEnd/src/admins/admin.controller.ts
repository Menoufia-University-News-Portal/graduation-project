import {Controller, Post} from '@nestjs/common';
import { AdminsService } from './admin.service';

@Controller('admin')
export class AdminController{
    constructor(private adminService: AdminsService){}
    
    /*@Patch('update/:id')
    async updateAdmin(@Param('id') id: number, @Body() payload: UpdateAdminDto){
      return await this.adminService.updateAdmin(id, payload);
    }*/

    @Post('static')
    async tryStatic(){
      return await this.adminService.createStatic();
    }

    /*@Get('/list')
    async listAdmins(){
      return await this.adminService.findAll();
    }*/

    /*@Get('/view/:id')
    async viewAdmin(@Param('id') id: number){
      return await this.adminService.findById(id);
    }*/
}