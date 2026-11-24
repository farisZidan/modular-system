// src/sensor/domain/sensor.entity.ts

export class SensorData { 
    constructor( 
        public readonly id: string, 
        public value: number, 
        public unit: string, 
        public deviceName: string, 
        public batteryLevel: number, 
        public timestamp: Date, ) {

        } 
        // Business Logic: Aturan validasi data 
        isNormal(): boolean { 
            return this.value >= 10 && this.value <= 40; // Contoh ambang batas suhu 
            } 
            
        isBatteryCritical(): boolean { 
            return this.batteryLevel < 20; 
        } 
} 