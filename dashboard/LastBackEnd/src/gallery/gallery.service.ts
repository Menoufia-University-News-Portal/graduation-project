/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Gallery } from 'src/typeOrm/entities/gallery.entity';
import { CreateGalleryParams, UpdateGalleryParams } from 'src/utils/gallery_types';
import { Repository } from 'typeorm';

@Injectable()
export class GalleryService {
    constructor(@InjectRepository(Gallery) private galleryRepository: Repository<Gallery>){}

    async addImageToDB(galleryDetails: CreateGalleryParams){
        AuthService.check();
        if(!AuthService.has_permission("add to gallery")) return "You haven't have the \"add to gallery\" permission";
        galleryDetails.link = galleryDetails.link.replace('gallery_uploads\\', '');
        const newImage = this.galleryRepository.create(galleryDetails);
        return await this.galleryRepository.save(newImage);
    }

    async updateImage(id: number, galleryDetails: UpdateGalleryParams){
        AuthService.check();
        if(!AuthService.has_permission("update gallery")) return "You haven't have the \"update gallery\" permission";                
        const ret = await this.galleryRepository.findOne({where: {image_id: id}});
        if(ret == null) return `There is no image with id = ${id}`;
        if(galleryDetails.link != undefined) ret.link = galleryDetails.link.replace('gallery_uploads\\', '');
        return await this.galleryRepository.save(ret);
    }

    async findAll(){
        //AuthService.check();
        //if(!AuthService.has_permission("list gallery")) return "You haven't have the \"list gallery\" permission";
        return await this.galleryRepository.find();
    }
 
    async viewAll(){
        return await this.galleryRepository.find();
    }
 
    async findById(image_id: number){
        //AuthService.check();
        //if(!AuthService.has_permission("view an image in gallery")) return "You haven't have the \"view an image in gallery\" permission";
        const ret = await this.galleryRepository.findOne({where: {image_id}});
        return (ret == null ? `There is no image with id = ${image_id}` : ret);
    }

    async findById_with_no_permissions(image_id: number){
        const ret = await this.galleryRepository.findOne({where: {image_id}});
        return (ret == null ? `There is no image with id = ${image_id}` : ret);
    }

    async deleteLeader(id: number){
        AuthService.check();
        if(!AuthService.has_permission("delete an image from gallery")) return "You haven't have the \"delete an image from gallery\" permission";
        await this.galleryRepository.delete(id);
        return 'This image is deleted successfully';
    }
}
