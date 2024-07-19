import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './auth-login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CreateAdminDto } from 'src/admins/dtos/createAdmin.dto';
import { UpdateAdminDto } from 'src/admins/dtos/updateAdmin.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('admin/add')
  async create(@Body() rowInserted: CreateAdminDto) {
    return await this.authService.check_newAdmin_data(rowInserted);
  }

  @Patch('admin/update/:id')
  async updateAdmin(@Param('id') id: number, @Body() payload: UpdateAdminDto){
    return await this.authService.is_authenticated_to_update(id, payload);
  }

  @Get('admin/view/:id')
  async viewAdmin(@Param('id') id: number){
    //return await this.adminService.findById(id);
    return await this.authService.is_authenticated_to_view(id);
  }

  @Get('admin/list')
  async listAdmins(){
    //return await this.adminService.findAll();
    return await this.authService.is_authenticated_to_list();
  }

  @Post('admin/login')
  async login(@Body() authLoginDto: AuthLoginDto){
    return this.authService.login(authLoginDto);
  }

  /*@Post('admin/logout')
  async logout(@Res({passthrough: true}) response: Response){
    return await this.authService.logout(response);
  }*/

  @UseGuards(JwtAuthGuard)
  @Get('admin/login/success')
  async test(@Req() request){
    const token = request.token; // Access token from the request object
   // return { token }; // Return the token as a response
    return await this.authService.successful_login({token});
    // return "Login Successfully";
  }

  @Post('admin/logout')
  async logout(){
    return await this.authService.logout();
  }

}