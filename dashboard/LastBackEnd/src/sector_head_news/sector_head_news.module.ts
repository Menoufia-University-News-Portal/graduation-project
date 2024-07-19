import { Module } from '@nestjs/common';
import { SectorHeadNewsService } from './sector_head_news.service';
import { SectorHeadNewsController } from './sector_head_news.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectorHeadNews } from 'src/typeOrm/entities/sector_head_news.entity';
import { MailService } from 'src/mail/mail.service';
import { SubscriberService } from 'src/subscriber/subscriber.service';
import { Subscriber } from 'src/typeOrm/entities/subscriber.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SectorHeadNews, Subscriber])],
  providers: [SectorHeadNewsService, MailService, SubscriberService],
  controllers: [SectorHeadNewsController],
})
export class SectorHeadNewsModule {}
