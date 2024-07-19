import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlackList } from 'src/typeOrm/entities/blacklist.entity';
import { CreateTokenParams } from 'src/utils/blacklist_types';
import { Repository } from 'typeorm';

@Injectable()
export class BlacklistService {
    constructor(@InjectRepository(BlackList) private blacklistRepository: Repository<BlackList>){}

    async addToken(tokenDetails: CreateTokenParams){
        const newToken = this.blacklistRepository.create(tokenDetails);
        return await this.blacklistRepository.save(newToken);
    }

    async findToken(cur_token){
        return await this.blacklistRepository.findOne({where: {token: cur_token}});;
    }
}
