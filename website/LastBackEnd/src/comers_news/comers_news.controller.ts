import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UploadedFile, UsePipes, ValidationPipe } from '@nestjs/common';
import { ComersNewsService } from './comers_news.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';
import { CreateComersNewsDto } from './comers_news_dtos/createComersNews.dto';
import { UpdateComersNewsDto } from './comers_news_dtos/updateComersNews.dto';

@Controller('comers-news')
export class ComersNewsController {
    constructor(private comers_newsService: ComersNewsService){}

    @Post('/add')
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
      async create(@UploadedFile() file: any, @Body() dto: CreateComersNewsDto) {
        return await this.comers_newsService.addNewsToDB({ ...dto, link: file.path });
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
    async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateComersNewsDto, @UploadedFile() file?: any){
        return await this.comers_newsService.updateNews(id, {...payload, link: file?.path});
    }

    @Get('/list')
    async list(){
        return await this.comers_newsService.findAll();
    }

    @Get('/viewAll')
    async viewWithoutAuthorization(){
        return await this.comers_newsService.viewAll();
    }

    // try it .............................................
    @Get('/:id')
    async view(@Param('id', ParseIntPipe) id: number){
        return await this.comers_newsService.findById(id);
    }

    @Delete('/delete/:id')
    async delete(@Param('id') id: number){
        return await this.comers_newsService.deleteNews(id);
    }

    @Get('/latest/newcomers')
    async viewLatest(){
      return await this.comers_newsService.findLatest();
    } 

    @Get('/display/12')
    async partDisplay(){
      return await this.comers_newsService.partShow();
    }

    /*// For display the date in Arabic
    @Get('formatted-date')
    getFormattedDate(@Query('date') date: string): string {
      if (!date) {
        throw new BadRequestException('Date query parameter is required');
      }
      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) {
        throw new BadRequestException('Invalid date format');
      }

      return this.comers_newsService.formatDateInArabic(parsedDate);
    }*/
}
