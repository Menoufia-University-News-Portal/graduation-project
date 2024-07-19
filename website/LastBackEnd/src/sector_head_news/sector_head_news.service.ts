/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { MailService } from 'src/mail/mail.service';
import { Faculty } from 'src/typeOrm/entities/faculties.entity';
import { SectorHeadNews } from 'src/typeOrm/entities/sector_head_news.entity';
import { CreateHeadNewsParams, UpdateHeadNewsParams } from 'src/utils/sector_head_news_types';
import { Repository } from 'typeorm';

@Injectable()
export class SectorHeadNewsService {
    constructor(@InjectRepository(SectorHeadNews) private sector_head_newsRepository: Repository<SectorHeadNews>, private readonly mailService: MailService) { }

    async addNewsToDB(sector_head_newsDetails: CreateHeadNewsParams) {
                                    /* To work in frontend: */
        AuthService.check();
        if(!AuthService.has_permission("add sector head news")) return "You haven't have the \"add news\" permission";
        sector_head_newsDetails.link = sector_head_newsDetails.link.replace('sectorHeadNews_uploads\\', '');
        const new_sectorHeadNews = this.sector_head_newsRepository.create(sector_head_newsDetails);
        new_sectorHeadNews.faculties = sector_head_newsDetails.faculties_ids.map(faculty_id => ({...new Faculty(), faculty_id})); 
        await this.mailService.notifyAll("A new sector head news has recently been added to the website.", "<p> A new <b> sector head news </b> has recently been added to the website. </p>");
        return await this.sector_head_newsRepository.save(new_sectorHeadNews);

                                    /* To work in backend: */
        /*let i = 0, s = "";
        const arr = [];
        while (true) {
            const ch = sector_head_newsDetails.faculties_ids[0][i];
            if (ch === ']') break;
            else if (ch >= '0' && ch <= '9') s += ch;
            else if (ch === ',') {
                arr.push(parseInt(s));
                s = "";
            }
            i++;
        }
        if (s !== "") arr.push(parseInt(s));
        sector_head_newsDetails.link = sector_head_newsDetails.link.replace('sectorHeadNews_uploads\\', '');
        const new_sectorHeadNews = this.sector_head_newsRepository.create(sector_head_newsDetails);
        new_sectorHeadNews.faculties = arr.map(faculty_id => ({ ...new Faculty(), faculty_id }));
        await this.mailService.notifyAll("A new sector head news has recently been added to the website.", "<p> A new <b> sector head news </b> has recently been added to the website. </p>");
        return await this.sector_head_newsRepository.save(new_sectorHeadNews);*/
    }

    async updateNews(id: number, sector_head_newsDetails: UpdateHeadNewsParams) {
                                    /* To work in frontend: */
        AuthService.check();
        if(!AuthService.has_permission("update sector head news")) return "You haven't have the \"update news\" permission";      
        const ret = await this.sector_head_newsRepository.findOne({ where: { sector_head_news_id: id } });
        if (ret == null) return `There is no news with id = ${id}`;
        if (sector_head_newsDetails.title != undefined) ret.title = sector_head_newsDetails.title;
        if (sector_head_newsDetails.description != undefined) ret.description = sector_head_newsDetails.description;
        if (sector_head_newsDetails.link != undefined) ret.link = sector_head_newsDetails.link.replace('sectorHeadNews_uploads\\', '');
        if (sector_head_newsDetails.faculties_ids != undefined) {
            ret.faculties = sector_head_newsDetails.faculties_ids.map(faculty_id => ({ ...new Faculty(), faculty_id }));
        }
        return await this.sector_head_newsRepository.save(ret);
                                    /* To work in backend: */
        /* // AuthService.check();
        // if(!AuthService.has_permission("update sector head news")) return "You haven't have the \"update news\" permission";
        const ret = await this.sector_head_newsRepository.findOne({where: {sector_head_news_id: id}});
        if(ret == null) return `There is no news with id = ${id}`;
        if(sector_head_newsDetails.title != undefined) ret.title = sector_head_newsDetails.title;
        if(sector_head_newsDetails.description != undefined) ret.description = sector_head_newsDetails.description;
        if(sector_head_newsDetails.link != undefined) ret.link = sector_head_newsDetails.link.replace('sectorHeadNews_uploads\\', '');
        if(sector_head_newsDetails.faculties_ids != undefined){
        let i = 0, s = "";
        const arr = [];
        while(true){
            const ch = sector_head_newsDetails.faculties_ids[0][i];
            if(ch === ']') break;
            else if(ch >= '0' && ch <= '9') s += ch;
            else if(ch === ','){
                arr.push(parseInt(s));
                s = "";
            }
            i++;
        }
        if(s !== "") arr.push(parseInt(s));
        ret.faculties = arr.map(faculty_id => ({...new Faculty(), faculty_id}));
        // ret.faculties = sector_head_newsDetails.faculties_ids.map(faculty_id => ({...new Faculty(), faculty_id}));
        }
        return await this.sector_head_newsRepository.save(ret);*/
    }

    async findAll() {
        //AuthService.check();
       // if(!AuthService.has_permission("list sector head news")) return "You haven't have the \"list news\" permission";
        return await this.sector_head_newsRepository.find({ relations: { faculties: true } });
    }

    async viewAll() {
        return await this.sector_head_newsRepository.find({ relations: { faculties: true } });
    }

    async findById(sector_head_news_id: number) {
      //  AuthService.check();
       // if(!AuthService.has_permission("view sector head news")) return "You haven't have the \"view news\" permission";
        const ret = await this.sector_head_newsRepository.findOne({ where: { sector_head_news_id }, relations: { faculties: true } });
        return (ret == null ? `There is no news with id = ${sector_head_news_id}` : ret);
    }

    async deleteNews(id: number) {
        AuthService.check();
        if (!AuthService.has_permission("delete sector head news")) return "You haven't have the \"delete news\" permission";
        const ret = await this.sector_head_newsRepository.findOne({where:{sector_head_news_id: id}});
        if(ret == null)  return `There is no sector_head_news with id = ${id}`;
        await this.sector_head_newsRepository.delete(id);
        return 'This news is deleted successfully';
    }

    async findLatest(){
        const arr = await this.sector_head_newsRepository.find({relations: {faculties: true}});
        console.log(arr.length);
        let cnt = 0;
        const arrRes = [];
        for(let i = arr.length-1; i >= 0; i--){
            cnt++;
            if(cnt>6)  break;
            arrRes.push(arr[i]);
        }
        return arrRes;
    }

    async partShow(){
        const arr = await this.sector_head_newsRepository.find({relations: {faculties: true}});
        let cnt = 0;
        const arrRes = [];
        for(let i = arr.length-1; i >= 0; i--){
            cnt++;
            if(cnt>12)  break;
            arrRes.push(arr[i]);
        }
        return arrRes;
    }

}
