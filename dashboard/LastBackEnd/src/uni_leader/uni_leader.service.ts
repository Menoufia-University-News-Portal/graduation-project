/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { UniLeader } from 'src/typeOrm/entities/uni_leader.entity';
import { CreateUniLeaderParams, UpdateUniLeaderParams } from 'src/utils/uni_leader_types';
import { Repository } from 'typeorm';

@Injectable()
export class UniLeaderService {
    constructor(@InjectRepository(UniLeader) private uniLeaderRepository: Repository<UniLeader>){}

    async addLeaderToDB(uniLeaderDetails: CreateUniLeaderParams){
        AuthService.check();
        if(!AuthService.has_permission("add university leaders")) return "You haven't have the \"add university leaders\" permission";
        uniLeaderDetails.link = uniLeaderDetails.link.replace('uniLeaders_uploads\\', '');
        const newLeader = this.uniLeaderRepository.create(uniLeaderDetails);
        return await this.uniLeaderRepository.save(newLeader);
    }

    async updateLeader(id: number, uniLeaderDetails: UpdateUniLeaderParams){
        AuthService.check();
        if(!AuthService.has_permission("update university leaders")) return "You haven't have the \"update university leaders\" permission";                
        const ret = await this.uniLeaderRepository.findOne({where: {leader_id: id}});
        if(ret == null) return `There is no event with id = ${id}`;
        if(uniLeaderDetails.name != undefined) ret.name = uniLeaderDetails.name;
        if(uniLeaderDetails.role != undefined) ret.role = uniLeaderDetails.role;
        if(uniLeaderDetails.link != undefined) ret.link = uniLeaderDetails.link.replace('uniLeaders_uploads\\', '');
        return await this.uniLeaderRepository.save(ret);
    }

    async findAll(){
        // AuthService.check();
        // if(!AuthService.has_permission("list university leaders")) return "You haven't have the \"list university leaders\" permission";
         return await this.uniLeaderRepository.find();
     }
 
     async viewAll(){
         return await this.uniLeaderRepository.find();
     }
 
     async findById(leader_id: number){
        // AuthService.check();
        // if(!AuthService.has_permission("view a university leader")) return "You haven't have the \"view a university leader\" permission";
         const ret = await this.uniLeaderRepository.findOne({where: {leader_id}});
         return (ret == null ? `There is no university leader with id = ${leader_id}` : ret);
     }

     async deleteLeader(id: number){
         AuthService.check();
         if(!AuthService.has_permission("delete university leaders")) return "You haven't have the \"delete university leaders\" permission";
         await this.uniLeaderRepository.delete(id);
         return 'This university leader is deleted successfully';
     }
}
