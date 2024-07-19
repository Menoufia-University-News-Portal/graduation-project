/* eslint-disable prettier/prettier */
import { Body, Controller, Param, Post } from '@nestjs/common';
import { PasswordService } from './password.service';

@Controller()
export class PasswordController {
    constructor(private passwordService: PasswordService){}

    @Post('password/forget')
    async forgot(@Body('email') email: string){
        return this.passwordService.forget_password(email);
    }

    @Post('reset/:str')
    async reset(@Param() params: any, @Body('token') token: string, @Body('password') password: string, @Body('confirm_password') confirm_password: string){
        return this.passwordService.reset_password(params, token, password, confirm_password);
    }
}