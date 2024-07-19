/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UploadedFile } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';
import { CreateGalleryDto } from './gallery_dtos/createGallery.dto';
import { UpdateGalleryParams } from 'src/utils/gallery_types';

@Controller('gallery')
export class GalleryController {
    constructor(private readonly galleryService: GalleryService) { }

    @Post('/add')
    @UseInterceptors(
        FileInterceptor('link', {
            storage: diskStorage({
                // Destination storage path details
                destination: (req: any, file: any, cb: any) => {
                    const uploadPath = './gallery_uploads';
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
    async create(@UploadedFile() file: any, @Body() dto: CreateGalleryDto) {
        //const links_paths = files.links.map(file => file.path);
        return await this.galleryService.addImageToDB({ ...dto, link: file.path });
    }

    @Patch('/update/:id')
    @UseInterceptors(
        FileInterceptor('link', {
            storage: diskStorage({
                // Destination storage path details
                destination: (req: any, file: any, cb: any) => {
                    const uploadPath = './gallery_uploads';
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
    async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateGalleryParams, @UploadedFile() file?: any) {
        // console.log(file?.path);
        return await this.galleryService.updateImage(id, { ...payload, link: file?.path });
    }

    @Get('/list')
    async list(){
        return await this.galleryService.findAll();
    }

    @Get('/viewAll')
    async listWithoutAuthorization(){
        return await this.galleryService.viewAll();
    }

    @Get('/:id')
    async view(@Param('id', ParseIntPipe) id: number){
        return await this.galleryService.findById(id);
    }

    @Get('/viewOne/:id')
    async view_without_permissions(@Param('id', ParseIntPipe) id: number){
        return await this.galleryService.findById_with_no_permissions(id);
    }

    @Delete('/delete/:id')
    async delete(@Param('id') id: number){
        return await this.galleryService.deleteLeader(id);
    }
}
