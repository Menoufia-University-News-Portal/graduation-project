/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus';

@Controller('health')
export class HealthCheckController {
    constructor(private health: HealthCheckService, private http: HttpHealthIndicator) {}
    
      @Get()
      @HealthCheck()
      check() {
        return this.health.check([() => this.http.pingCheck('', '/')]);
      }
}
