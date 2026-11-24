// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // Memperbarui aplikasi secara otomatis di latar belakang
      // Mengatur agar semua aset (html, js, css) masuk ke cache
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
      manifest: {
        name: 'Sistem Terintegrasi Lintas Platform',
        short_name: 'SysIntegrate',
        theme_color: '#1A73E8', // Sesuai Design System Modul 3
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
  ],
});
