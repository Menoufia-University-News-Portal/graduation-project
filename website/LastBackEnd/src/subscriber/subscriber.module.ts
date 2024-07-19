/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SubscriberController } from './subscriber.controller';
import { SubscriberService } from './subscriber.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscriber } from 'src/typeOrm/entities/subscriber.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subscriber])],
  controllers: [SubscriberController],
  providers: [SubscriberService]
})
export class SubscriberModule {}
