// modular-system/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });
  // Logika Keamanan: Mengaktifkan CORS untuk menerima request luar
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:3000'], // Pada tahap produksi, batasi ke domain web spesifik saja
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credential: true,
  });
  await app.listen(3000);
}
void bootstrap();
