import { Module } from '@nestjs/common';
import { LightControlService } from './application/light-control.service';
import { LightControlController } from './infrastructure/light-control/light-control.controller';

@Module({
  providers: [LightControlService],
  controllers: [LightControlController]
})
export class LightControlModule {}
