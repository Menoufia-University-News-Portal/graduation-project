/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UploadedFile, UsePipes, ValidationPipe} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './news_dtos/createNews.dto';
import { UpdateNewsDto } from './news_dtos/updateNews.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';

@Controller('news')
export class NewsController {
    constructor(private newsService: NewsService){}

   /* @Post('/add')
    async create(@Body() dto: CreateNewsDto){
        return this.newsService.addNewsToDB(dto);
    }*/

    @Post('/add')
    @UsePipes(new ValidationPipe({ transform: true }))
    @UseInterceptors(FileInterceptor('link', {
      storage: diskStorage({
        // Destination storage path details
        destination: (req: any, file: any, cb: any) => {
          const uploadPath = './news_uploads';
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
    async create(@UploadedFile() file: any, @Body() dto: CreateNewsDto) {
      return await this.newsService.addNewsToDB({ ...dto, link: file.path });
    }

    @Patch('/update/:id')
    @UsePipes(new ValidationPipe({ transform: true }))
    @UseInterceptors(FileInterceptor('link', {
      storage: diskStorage({
        // Destination storage path details
        destination: (req: any, file: any, cb: any) => {
          const uploadPath = './news_uploads';
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
    async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateNewsDto, @UploadedFile() file?: any){
        return await this.newsService.updateNews(id, {...payload, link: file?.path});
    }

    @Get('/list')
    async list(){
        return await this.newsService.findAll();
    }

    @Get('/viewAll')
    async viewWithoutAuthorization(){
        return await this.newsService.viewAll();
    }

    // try it .............................................
    @Get('/:id')
    async view(@Param('id', ParseIntPipe) id: number){
        return await this.newsService.findById(id);
    }

    @Delete('/delete/:id')
    async delete(@Param('id') id: number){
        return await this.newsService.deleteNews(id);
    }

    @Get('/latest/news')
    async viewLatest(){
      return await this.newsService.findLatest();
    } 

    @Get('/display/12')
    async partDisplay(){
      return await this.newsService.partShow();
    }

}