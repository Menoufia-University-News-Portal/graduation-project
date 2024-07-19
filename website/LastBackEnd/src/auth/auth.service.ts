import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminsService } from 'src/admins/admin.service';
import { AuthLoginDto } from './auth-login.dto';
import { CreateAdminDto } from 'src/admins/dtos/createAdmin.dto';
import { BlacklistService } from 'src/blacklist/blacklist.service';
import { UpdateAdminDto } from 'src/admins/dtos/updateAdmin.dto';

@Injectable()
export class AuthService {
    admin_info : AdminInfo;
    access_token = "";
    static autherized = false;
    static admin_permissions = [];
    static entered_successful_login = false;
    static exception_happened = false;
    static email_loginned = "";
   // aa : AdminInfo = this.admin_info
       /* admin_id: 66,
        name: "klk",
        email: "klk@gmail.com",
        password: "klk1234",
        is_active: false,
        permissions: [{
            permission_id: 1,
            type: "jkjk"
        }],
        faculties: [{
            faculty_id: 1,
            name: "klk",
            dean_name: "hjhjh"
        }]*/

    constructor(private adminService: AdminsService, private jwtService: JwtService, private blacklistService: BlacklistService){}

    static check(){
        if(!AuthService.entered_successful_login || AuthService.exception_happened || !AuthService.autherized){
            throw new UnauthorizedException();
        }
    }

    static has_permission(permission: string): boolean{
        for(let i=0; i<AuthService.admin_permissions.length; i++){
            if(AuthService.admin_permissions[i].type == permission) return true;
        }
        return false;
    }

    public async check_newAdmin_data(createAdminDto: CreateAdminDto){
        AuthService.check();
        //console.log(this.admin_permissions);
        if(AuthService.has_permission("add admins")){
            const admin = await this.adminService.findByEmail(createAdminDto.email);
            //console.log(admin);
            if(admin == null){
                await this.adminService.addAdminToDB(createAdminDto);
                return createAdminDto;
            }
            else return 'This email is already exist';
        }
        else return "You haven't have the \"add admins\" permission";
    }

    async is_authenticated_to_update(id: number, updateAdminDetails: UpdateAdminDto){
        AuthService.check();
        if(AuthService.has_permission("update admins")){
            return await this.adminService.updateAdmin(id, updateAdminDetails);
        }
        else return "You haven't have the \"update admins\" permission";
    }

    async is_authenticated_to_view(id: number){
        AuthService.check();
        if(AuthService.has_permission("view an admin")) return await this.adminService.findById(id);
        else return "You haven't have the \"view an admin\" permission";
    }

    async is_authenticated_to_list(){
       // AuthService.check();
       // if(!AuthService.has_permission("list admins")) return "You haven't have the \"list admins\" permission";
        return await this.adminService.findAll();
    }

    async login(authLoginDto: AuthLoginDto){
        const admin = await this.validateAdmin(authLoginDto);
        const payload = {
            adminId: admin.admin_id
        };
        this.admin_info = await this.adminService.findById(admin.admin_id);
        AuthService.admin_permissions = this.admin_info.permissions;
        AuthService.email_loginned = this.admin_info.email;
        //console.log(this.admin_permissions);
        //console.log(this.admin_info.permissions);
        this.access_token = this.jwtService.sign(payload);
        //console.log(await this.adminService.findById(admin.admin_id));
        return{
            access_token: this.access_token,
            admin_info: this.admin_info
        };
    }

    async validateAdmin(authLoginDto: AuthLoginDto){
        const {email, password} = authLoginDto;
        const admin = await this.adminService.findByEmail(email);
        //console.log(admin);
        if(!(await admin?.validatePassword(password)) || admin.is_active == false){
            throw new UnauthorizedException();
        }
        return admin;
    }

    async successful_login(token: any){
        AuthService.entered_successful_login = true;
        AuthService.autherized = false, AuthService.exception_happened = false;
        if(token.token != this.access_token){
            //this.autherized = false;
            AuthService.exception_happened = true;
            throw new UnauthorizedException(); // the bearer token != access token returned from login
        }
        const res = await this.blacklistService.findToken(this.access_token);
        if(res == null){
            AuthService.autherized = true;
            return this.admin_info;
        }
        AuthService.autherized = false;
        AuthService.exception_happened = true;
        throw new UnauthorizedException(); // this token is found in blacklist
    }

   /* async logout(response: Response){
        response.clearCookie('jwt');
        return {
            message: 'success'
        }
    }*/

    async logout(){
        if(AuthService.autherized && AuthService.entered_successful_login){
            AuthService.entered_successful_login = false;
            AuthService.autherized = false;
            return await this.blacklistService.addToken({token: this.access_token});
        }
        AuthService.entered_successful_login = false;
        return 'There is no admin in the system!!';       
    }

   /* async logout_after_reset_password(){
        AuthService.entered_successful_login = false;
        AuthService.autherized = false;
        await this.blacklistService.addToken({token: this.access_token});
    }*/
}