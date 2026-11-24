// src/sensor/sensor.module.ts 
import { Module } from '@nestjs/common'; 
import { SensorController } from './infrastructure/sensor/sensor.controller'; 
import { SensorService } from './application/sensor.service';  

@Module({   
    controllers: [SensorController],   
    providers: [SensorService], 
}) 
export class SensorModule {} 