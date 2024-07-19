/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Password } from '../typeOrm/entities/password.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { AdminsService } from 'src/admins/admin.service';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class PasswordService {
    static target_email = "";
    static email_content = "";

    constructor(@InjectRepository(Password) private readonly passwordRepository: Repository<Password>, private adminService: AdminsService, private mailService: MailService){}

    async create(body: any){
        return await this.passwordRepository.save(body);
    }

    async findOne(data: any){
        return await this.passwordRepository.find(data);
    }

    async forget_password(email: any){
        PasswordService.target_email = email;
        const token = Math.random().toString(20).substring(2, 12); //generate random token
        await this.create({ email, token });
        const url = `http://localhost:3001/reset/${token}`;
        PasswordService.email_content = url;
        const html = `<p>This email is to reset your password</p><br><a href=http://localhost:3000/resetpassword/${token}>click here</a>`;
        return {url, 'message': this.mailService.sendMail('Reset password', `This email is to reset your password. click here: http://localhost:3000/resetpassword/${token}`, html)};
        //return url;        
    }

    async reset_password(params: any, token: string, password: string, confirm_password: string){
        // console.log(params.str);
        if(token != params.str) return 'Incorrect token';
        if(password !== confirm_password){
            return "Passwords don\'t match";
            throw new BadRequestException('Passwords don\'t match');
        }
        if(password.length < 7 || password.length > 20){ 
            return 'The password length must be from 7 to 20 characters';
        }
        const passwordReset: any = await this.findOne({token});
        //return passwordReset[passwordReset.length-1].email;
        const admin = await this.findOne({where: {email: passwordReset[passwordReset.length-1].email}});
        if(!admin){
            throw new NotFoundException('Admin with this token doesn\'t exist');
        }
        const hashedPassword = await bcrypt.hash(password, 7);
        const ret = await this.adminService.findByEmail(admin[0].email);
        await this.adminService.update(ret.admin_id, {password: hashedPassword});
        //await this.authService.logout_after_reset_password();
        const email_after_reset_txt = 'The password is updated successfully' + '\n' + 'Try to login with your new password from here: "http://localhost:3000/"';
        const email_after_reset_html = '<p>The password is updated successfully<br>try to login with your new password from here:</p><a href="http://localhost:3000/">Login</a>'
        return this.mailService.sendMail('Successful password reset', email_after_reset_txt, email_after_reset_html)
    }
}
