/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { MailService } from 'src/mail/mail.service';
import { Faculty } from 'src/typeOrm/entities/faculties.entity';
import { News } from 'src/typeOrm/entities/news.entity';
import { CreateNewsParams, UpdateNewsParams } from 'src/utils/news_types';
import { Repository } from 'typeorm';

@Injectable()
export class NewsService {
    constructor(@InjectRepository(News) private newsRepository: Repository<News>, private readonly mailService: MailService){}

    async addNewsToDB(newsDetails: CreateNewsParams){
                    /* To work in frontend: */
        AuthService.check();
        if(!AuthService.has_permission("add news")) return "You haven't have the \"add news\" permission";
        newsDetails.link = newsDetails.link.replace('news_uploads\\', ''); 
        const newNews = this.newsRepository.create(newsDetails);
        newNews.faculties = newsDetails.faculties_ids.map(faculty_id => ({...new Faculty(), faculty_id})); 
        await this.mailService.notifyAll("A new news has recently been added to the website.", "<p> A new <b> news </b> has recently been added to the website. </p>");
        return await this.newsRepository.save(newNews);

                    /* To work in backend: */
        /*AuthService.check();
        if(!AuthService.has_permission("add news")) return "You haven't have the \"add news\" permission";
        let i = 0, s = "";
        const arr = [];
        while(true){
            const ch = newsDetails.faculties_ids[0][i];
            if(ch === ']') break;
            else if(ch >= '0' && ch <= '9') s += ch;
            else if(ch === ','){
                arr.push(parseInt(s));
                s = "";
            }
            i++;
        }
        if(s !== "") arr.push(parseInt(s)); 
        newsDetails.link = newsDetails.link.replace('news_uploads\\', '');
        const newNews = this.newsRepository.create(newsDetails);
        newNews.faculties = arr.map(faculty_id => ({...new Faculty(), faculty_id})); 
        await this.mailService.notifyAll("A new news has recently been added to the website.", "<p> A new <b> news </b> has recently been added to the website. </p>");
        return await this.newsRepository.save(newNews);*/
    }

    async updateNews(id: number, newsDetails: UpdateNewsParams){
                    /* To work in frontend: */
        AuthService.check();
        if(!AuthService.has_permission("update news")) return "You haven't have the \"update news\" permission";      
        const ret = await this.newsRepository.findOne({where: {news_id: id}});
        if(ret == null) return `There is no news with id = ${id}`;
        if(newsDetails.title != undefined) ret.title = newsDetails.title;
        if(newsDetails.description != undefined) ret.description = newsDetails.description;
        if(newsDetails.link != undefined) ret.link = newsDetails.link.replace('news_uploads\\', '');
        if(newsDetails.faculties_ids != undefined){
            ret.faculties = newsDetails.faculties_ids.map(faculty_id => ({...new Faculty(), faculty_id}));
        }
        return await this.newsRepository.save(ret);
                    /* To work in backend: */
        /*AuthService.check();
        if(!AuthService.has_permission("update news")) return "You haven't have the \"update news\" permission";
        const ret = await this.newsRepository.findOne({where: {news_id: id}});
        if(ret == null) return `There is no news with id = ${id}`;
        if(newsDetails.title != undefined) ret.title = newsDetails.title;
        if(newsDetails.description != undefined) ret.description = newsDetails.description;
        if(newsDetails.link != undefined) ret.link = newsDetails.link.replace('news_uploads\\', '');
        if(newsDetails.faculties_ids != undefined){
            let i = 0, s = "";
            const arr = [];
            while(true){
                const ch = newsDetails.faculties_ids[0][i];
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
           // ret.faculties = newsDetails.faculties_ids.map(faculty_id => ({...new Faculty(), faculty_id}));
        }
        return await this.newsRepository.save(ret);*/
    }

    async findAll(){
       // AuthService.check();
       // if(!AuthService.has_permission("list news")) return "You haven't have the \"list news\" permission";
        return await this.newsRepository.find({relations: {faculties: true}});
    }

    async viewAll(){
        return await this.newsRepository.find({relations: {faculties: true}});
    }

    async findById(news_id: number){
        //AuthService.check();
        //if(!AuthService.has_permission("view news")) return "You haven't have the \"view news\" permission";
        const ret = await this.newsRepository.findOne({where: {news_id}, relations: {faculties: true}});
        return (ret == null ? `There is no news with id = ${news_id}` : ret);
    }

    async deleteNews(id: number){
        AuthService.check();
        if(!AuthService.has_permission("delete news")) return "You haven't have the \"delete news\" permission";
        const ret = await this.newsRepository.findOne({where:{news_id: id}});
        if(ret == null)  return `There is no news with id = ${id}`;
        await this.newsRepository.delete(id);
        return 'This news is deleted successfully';
    }

    async findLatest(){
        const arr = await this.newsRepository.find({relations: {faculties: true}});
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
        const arr = await this.newsRepository.find({relations: {faculties: true}});
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