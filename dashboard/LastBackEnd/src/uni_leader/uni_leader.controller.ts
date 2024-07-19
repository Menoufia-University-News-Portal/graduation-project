/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UploadedFile } from '@nestjs/common';
import { UniLeaderService } from './uni_leader.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';
import { CreateUniLeaderDto } from './dtos/createUniLeader.dto';
import { UpdateUniLeaderDto } from './dtos/updateUniLeader.dto';

@Controller('uni-leader')
export class UniLeaderController {
  constructor(private uniLeaderService: UniLeaderService) {}

  @Post('/add')
  @UseInterceptors(
    FileInterceptor('link', {
      storage: diskStorage({
        // Destination storage path details
        destination: (req: any, file: any, cb: any) => {
          const uploadPath = './uniLeaders_uploads';
          // Create folder if doesn't exist
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath);
          }
          cb(null, uploadPath);
        }, // to add image extension of the uploaded image automatically
        filename: (req, file, cb) => {
          // Generating a 32 random chars long string
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          //Calling the callback passing the random name generated with the original extension name
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async create(@UploadedFile() file: any, @Body() dto: CreateUniLeaderDto) {
    //const links_paths = files.links.map(file => file.path);
    return await this.uniLeaderService.addLeaderToDB({...dto, link: file.path});
  }

  @Patch('/update/:id')
  @UseInterceptors(
    FileInterceptor('link', {
      storage: diskStorage({
        // Destination storage path details
        destination: (req: any, file: any, cb: any) => {
          const uploadPath = './uniLeaders_uploads';
          // Create folder if doesn't exist
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath);
          }
          cb(null, uploadPath);
        }, // to add image extension of the uploaded image automatically
        filename: (req, file, cb) => {
          // Generating a 32 random chars long string
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          //Calling the callback passing the random name generated with the original extension name
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateUniLeaderDto, @UploadedFile() file?: any) {
    // console.log(file?.path);
    return await this.uniLeaderService.updateLeader(id, {...payload, link: file?.path});
  }

  @Get('/list')
  async list(){
      return await this.uniLeaderService.findAll();
  }

  @Get('/viewAll')
  async viewWithoutAuthorization(){
      return await this.uniLeaderService.viewAll();
  }

  @Get('/:id')
  async view(@Param('id', ParseIntPipe) id: number){
      return await this.uniLeaderService.findById(id);
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: number){
      return await this.uniLeaderService.deleteLeader(id);
  }
}
