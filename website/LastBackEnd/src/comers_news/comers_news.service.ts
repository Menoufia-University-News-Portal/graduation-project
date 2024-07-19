/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { MailService } from 'src/mail/mail.service';
import { ComersNews } from 'src/typeOrm/entities/comers_news.entity';
import { Faculty } from 'src/typeOrm/entities/faculties.entity';
import { CreateComersNewsParams, UpdateComersNewsParams } from 'src/utils/comers_news_types';
import { Repository } from 'typeorm';

/*// For display the date in Arabic
import { ar } from 'date-fns/locale';*/

@Injectable()
export class ComersNewsService {
    constructor(@InjectRepository(ComersNews) private comers_newsRepository: Repository<ComersNews>, private readonly mailService: MailService) { }

    async addNewsToDB(comers_newsDetails: CreateComersNewsParams) {
                                    /* To work in frontend: */
        AuthService.check();
        if(!AuthService.has_permission("add comers news")) return "You haven't have the \"add news\" permission";
        comers_newsDetails.link = comers_newsDetails.link.replace('comersNews_uploads\\', '');
        const new_comersNews = this.comers_newsRepository.create(comers_newsDetails);
        new_comersNews.faculties = comers_newsDetails.faculties_ids.map(faculty_id => ({...new Faculty(), faculty_id})); 
        await this.mailService.notifyAll("A new newcomers news has recently been added to the website.", "<p> A new <b> newcomers news </b> has recently been added to the website. </p>");
        return await this.comers_newsRepository.save(new_comersNews);

                                    /* To work in backend: */
        /*let i = 0, s = "";
        const arr = [];
        while (true) {
            const ch = comers_newsDetails.faculties_ids[0][i];
            if (ch === ']') break;
            else if (ch >= '0' && ch <= '9') s += ch;
            else if (ch === ',') {
                arr.push(parseInt(s));
                s = "";
            }
            i++;
        }
        if (s !== "") arr.push(parseInt(s));
        comers_newsDetails.link = comers_newsDetails.link.replace('comersNews_uploads\\', '');
        const new_comersNews = this.comers_newsRepository.create(comers_newsDetails);
        new_comersNews.faculties = arr.map(faculty_id => ({ ...new Faculty(), faculty_id }));
        await this.mailService.notifyAll("A new newcomers news has recently been added to the website.", "<p> A new <b> newcomers news </b> has recently been added to the website. </p>");
        return await this.comers_newsRepository.save(new_comersNews);*/
    }

    async updateNews(id: number, comers_newsDetails: UpdateComersNewsParams) {
                                    /* To work in frontend: */
        AuthService.check();
        if(!AuthService.has_permission("update comers news")) return "You haven't have the \"update news\" permission";      
        const ret = await this.comers_newsRepository.findOne({ where: { comers_news_id: id } });
        if (ret == null) return `There is no news with id = ${id}`;
        if (comers_newsDetails.title != undefined) ret.title = comers_newsDetails.title;
        if (comers_newsDetails.description != undefined) ret.description = comers_newsDetails.description;
        if (comers_newsDetails.link != undefined) ret.link = comers_newsDetails.link.replace('comersNews_uploads\\', '');
        if (comers_newsDetails.faculties_ids != undefined) {
            ret.faculties = comers_newsDetails.faculties_ids.map(faculty_id => ({ ...new Faculty(), faculty_id }));
        }
        return await this.comers_newsRepository.save(ret);
                                    /* To work in backend: */
        /*//AuthService.check();
        //if(!AuthService.has_permission("update comers news")) return "You haven't have the \"update news\" permission";
        const ret = await this.comers_newsRepository.findOne({where: {comers_news_id: id}});
        if(ret == null) return `There is no news with id = ${id}`;
        if(comers_newsDetails.title != undefined) ret.title = comers_newsDetails.title;
        if(comers_newsDetails.description != undefined) ret.description = comers_newsDetails.description;
        if(comers_newsDetails.link != undefined) ret.link = comers_newsDetails.link.replace('comersNews_uploads\\', '');
        if(comers_newsDetails.faculties_ids != undefined){
        let i = 0, s = "";
        const arr = [];
        while(true){
            const ch = comers_newsDetails.faculties_ids[0][i];
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
        // ret.faculties = comers_newsDetails.faculties_ids.map(faculty_id => ({...new Faculty(), faculty_id}));
        }
        return await this.comers_newsRepository.save(ret);*/
    }

    async findAll() {
        AuthService.check();
        if(!AuthService.has_permission("list comers news")) return "You haven't have the \"list news\" permission";
        return await this.comers_newsRepository.find({ relations: { faculties: true } });
    }

    async viewAll() {
        return await this.comers_newsRepository.find({ relations: { faculties: true } });
    }

    async findById(comers_news_id: number) {
        //AuthService.check();
        //if(!AuthService.has_permission("view comers news")) return "You haven't have the \"view news\" permission";
        const ret = await this.comers_newsRepository.findOne({ where: { comers_news_id }, relations: { faculties: true } });
        return (ret == null ? `There is no news with id = ${comers_news_id}` : ret);
    }

    async deleteNews(id: number) {
        AuthService.check();
        if (!AuthService.has_permission("delete comers news")) return "You haven't have the \"delete news\" permission";
        const ret = await this.comers_newsRepository.findOne({where:{comers_news_id: id}});
        if(ret == null)  return `There is no comers_news with id = ${id}`;
        await this.comers_newsRepository.delete(id);
        return 'This news is deleted successfully';
    }

    async findLatest(){
        const arr = await this.comers_newsRepository.find({relations: {faculties: true}});
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
        const arr = await this.comers_newsRepository.find({relations: {faculties: true}});
        let cnt = 0;
        const arrRes = [];
        for(let i = arr.length-1; i >= 0; i--){
            cnt++;
            if(cnt>12)  break;
            arrRes.push(arr[i]);
        }
        return arrRes;
    }

    /*// For display the date in Arabic
    formatDateInArabic(date: Date): string {
        return format(date, 'PPPPpppp', { locale: ar });
    }*/

}
