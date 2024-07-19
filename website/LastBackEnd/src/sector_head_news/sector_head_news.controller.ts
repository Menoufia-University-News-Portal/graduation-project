/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { SectorHeadNewsService } from './sector_head_news.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateHeadNewsDto } from './dtos/createHeadNews.dto';
import { UpdateHeadNewsDto } from './dtos/updateHeadNews.dto';

@Controller('sector-head-news')
export class SectorHeadNewsController {
    constructor(private sector_head_newsService: SectorHeadNewsService){}

    @Post('/add')
    @UsePipes(new ValidationPipe({ transform: true }))
    @UseInterceptors(FileInterceptor('link', {
      storage: diskStorage({
        // Destination storage path details
        destination: (req: any, file: any, cb: any) => {
          const uploadPath = './sectorHeadNews_uploads';
          // Create folder if doesn't exist
          if (!existsSync(uploadPath)) mkdirSync(uploadPath);
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          // Generating a 32 random chars long string
          const randomName = Array(32).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
      
          //Calling the callback passing the random name generated with the original extension name
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }))
    async create(@UploadedFile() file: any, @Body() dto: CreateHeadNewsDto) {
      return await this.sector_head_newsService.addNewsToDB({ ...dto, link: file.path });
    }

    @Patch('/update/:id')
    @UsePipes(new ValidationPipe({ transform: true }))
    @UseInterceptors(FileInterceptor('link', {
      storage: diskStorage({
        // Destination storage path details
        destination: (req: any, file: any, cb: any) => {
          const uploadPath = './comersNews_uploads';
          // Create folder if doesn't exist
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath);
          }
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            // Generating a 32 random chars long string
            const randomName = Array(32).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
  
            //Calling the callback passing the random name generated with the original extension name
            cb(null, `${randomName}${extname(file.originalname)}`);
        },

      }),
    }))
    async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateHeadNewsDto, @UploadedFile() file?: any){
        return await this.sector_head_newsService.updateNews(id, {...payload, link: file?.path});
    }

    @Get('/list')
    async list(){
        return await this.sector_head_newsService.findAll();
    }

    @Get('/viewAll')
    async viewWithoutAuthorization(){
        return await this.sector_head_newsService.viewAll();
    }

    // try it .............................................
    @Get('/:id')
    async view(@Param('id', ParseIntPipe) id: number){
        return await this.sector_head_newsService.findById(id);
    }

    @Delete('/delete/:id')
    async delete(@Param('id') id: number){
        return await this.sector_head_newsService.deleteNews(id);
    }

    @Get('/latest/head')
    async viewLatest(){
      return await this.sector_head_newsService.findLatest();
    } 

    @Get('/display/12')
    async partDisplay(){
      return await this.sector_head_newsService.partShow();
    }
}
