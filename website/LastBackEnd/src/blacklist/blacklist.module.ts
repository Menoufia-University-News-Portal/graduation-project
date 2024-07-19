import { Module } from '@nestjs/common';
import { BlacklistController } from './blacklist.controller';
import { BlacklistService } from './blacklist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlackList } from 'src/typeOrm/entities/blacklist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BlackList])],
  controllers: [BlacklistController],
  providers: [BlacklistService],
  exports: [BlacklistService]
})
export class BlacklistModule {}
