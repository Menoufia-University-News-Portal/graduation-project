/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UniLeaderController } from './uni_leader.controller';
import { UniLeaderService } from './uni_leader.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniLeader } from 'src/typeOrm/entities/uni_leader.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UniLeader])],
  controllers: [UniLeaderController],
  providers: [UniLeaderService]
})
export class UniLeaderModule {}
