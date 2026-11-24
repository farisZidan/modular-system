// src/sensor/sensor.service.ts
import { Injectable } from '@nestjs/common';
import { SensorData } from '../domain/sensor.entity';
@Injectable()
export class SensorService {
  // Simulasi pengambilan data dari database/IoT
  //private mockData = new SensorData('S001', 28.5, '°C', 'DHT22-V2', 85, new Date());
  private mockData: SensorData[] = [
    new SensorData('S1', 28.5, '°C', 'DHT22-V2', 85, new Date()),
    new SensorData('S2', 24.5, '°C', 'Ambient Temp', 85, new Date()),
    new SensorData('S3', 1012, 'hPa', 'Pressure', 85, new Date()),
    new SensorData('S4', 88.2, '°C', 'Core Heat', 85, new Date()),
    new SensorData('S5', 12, '%', 'Battery Level', 85, new Date()),
  ];
  // BFF: Transformasi data khusus untuk Mobile
  // Fokus: Hemat Bandwidth & Kecepatan Baca
  getSummaryForMobile() {
    return this.mockData.map((sensor) => ({
      id: sensor.id, // Ditambahkan agar aplikasi mobile tahu ini data dari sensor mana
      v: sensor.value,
      u: sensor.unit,
      st: sensor.isNormal() ? 'OK' : 'WARN',
      batt: sensor.isBatteryCritical() ? 'LOW' : 'GOOD',
    }));
  }
  // BFF: Transformasi data khusus untuk Web Dashboard
  // Fokus: Analitik Lengkap & Transparansi Data
  getFullDetailsForWeb() {
    return this.mockData.map((sensor) => ({
      id: sensor.id,
      deviceName: sensor.deviceName,
      reading: {
        current: sensor.value,
        unit: sensor.unit,
        isOptimal: sensor.isNormal(),
      },
      status: {
        battery: `${sensor.batteryLevel}%`,
        lastSeen: sensor.timestamp.toISOString(),
      },
    }));
  }
}
