/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Design Tokens untuk Status Sensor
        tech: {
          primary: '#3b82f6', // Blue (Normal)
          warning: '#f59e0b', // Amber (Baterai Rendah / Anomali)
          danger: '#ef4444', // Red (Kritis)
          bg: '#f8fafc', // Slate-50 (Surface)
        },
      },
      spacing: {
        'safe-area': '1.25rem', // Padding standar untuk kenyamanan mobile
      },
    },
  },
  plugins: [],
};
