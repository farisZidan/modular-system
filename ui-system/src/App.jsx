// src/App.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import StatusCard from './components/StatusCard';
import './index.css';

const CACHE_KEY = 'sensor_analytics_cache_v1';

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [sensors, setSensors] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/sensor/web/analytics',
          { timeout: 5000 },
        );

        const data = Array.isArray(response.data) ? response.data : [];
        setSensors(data);
        setApiError(false);
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
      } catch (error) {
        console.error('Gagal terhubung ke BFF NestJS:', error);
        setApiError(true);

        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          try {
            const parsed = JSON.parse(cached);
            if (Array.isArray(parsed)) {
              setSensors(parsed);
            }
          } catch (parseErr) {
            console.error('Gagal membaca cache lokal:', parseErr);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchApiData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-tech-bg flex items-center justify-center font-bold">
        Menghubungkan ke BFF Node.js...
      </div>
    );
  }

  const showOfflineBanner = !isOnline || apiError;

  return (
    <div className="min-h-screen bg-tech-bg p-safe-area font-sans text-slate-900">
      {showOfflineBanner && (
        <div className="fixed top-0 left-0 right-0 bg-red-600 text-white p-2 text-center z-50">
          {!isOnline
            ? 'Anda sedang offline. Menampilkan data cadangan lokal.'
            : 'Gagal terhubung ke BFF NestJS. Menampilkan data cadangan lokal.'}
        </div>
      )}

      <header className="max-w-5xl mx-auto mb-8">
        <div className="flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                showOfflineBanner ? 'bg-red-400' : 'bg-green-400'
              }`}
            ></span>
            <span
              className={`relative inline-flex rounded-full h-3 w-3 ${
                showOfflineBanner ? 'bg-red-500' : 'bg-green-500'
              }`}
            ></span>
          </div>
          <div>
            <h1 className="text-xl font-black uppercase tracking-tighter">
              SensorNodes <span className="text-tech-primary">Controller</span>
            </h1>
            <p className="text-slate-500 text-[10px] font-bold tracking-widest uppercase">
              {showOfflineBanner
                ? 'Offline / Cached Mode'
                : 'BFF Connected & Active'}
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sensors.length > 0 ? (
          sensors.map((item) => (
            <StatusCard
              key={item.id}
              label={item.deviceName}
              value={item.reading?.current}
              unit={item.reading?.unit}
              status={item.reading?.isOptimal ? 'OK' : 'DANGER'}
              isCompact={false}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-slate-500 py-8">
            Belum ada data sensor yang tersedia.
          </div>
        )}
      </main>

      <footer className="max-w-5xl mx-auto mt-12 opacity-50 text-center">
        <br />
        <p className="text-[10px] font-medium italic">
          {showOfflineBanner
            ? 'Offline Fallback Active'
            : 'BFF Node.js Connected'}{' '}
          • System Version 2.0.4
        </p>
      </footer>
    </div>
  );
}

export default App;
