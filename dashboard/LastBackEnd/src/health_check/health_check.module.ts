/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { HealthCheckController } from './health_check.controller';
import { HealthCheckService } from './health_check.service';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [HealthCheckController],
  providers: [HealthCheckService]
})
export class HealthCheckModule {}
