// src/sensor/infrastructure/sensor.controller.ts 
import { Controller, Get } from '@nestjs/common'; 
import { SensorService } from '../../application/sensor.service'; // Import dari Application Layer  
 
@Controller('sensor') export class SensorController {   
    constructor(private readonly sensorService: SensorService) {}    
    
// Endpoint khusus untuk Mobile (BFF Mobile)   
@Get('mobile/dashboard')   getMobileView() {     
    return this.sensorService.getSummaryForMobile();   
}    

// Endpoint khusus untuk Web (BFF Web)   
@Get('web/analytics')   getWebView() {     
    return this.sensorService.getFullDetailsForWeb();   
} } 