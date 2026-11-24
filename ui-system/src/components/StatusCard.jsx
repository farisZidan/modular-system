// src/components/StatusCard.jsx
import React from 'react';
const StatusCard = ({ label, value, unit, status, isCompact }) => {
  // 🎨 Mapping status ke Design Tokens yang telah dikonfigurasi di tailwind.config.js
  const statusStyles = {
    OK: 'border-tech-primary bg-blue-50 text-tech-primary',
    WARNING: 'border-tech-warning bg-amber-50 text-tech-warning',
    DANGER: 'border-tech-danger bg-red-50 text-tech-danger',
    default: 'border-gray-200 bg-tech-bg text-gray-500',
  };
  const currentStyle = statusStyles[status] || statusStyles.default;
  return (
    // Menggunakan p-safe-area untuk padding jika diperlukan sesuai spek mobile Anda
    <div
      className={`p-safe-area rounded-xl border-l-8 shadow-sm transition-all
${currentStyle}`}
    >
      <p
        className="text-[10px] font-bold uppercase tracking-widest
opacity-80"
      >
        {label}
      </p>
      <div className="flex items-baseline gap-1 mt-1">
        <h2 className="text-3xl font-black">{value}</h2>
        <span className="text-sm font-medium">{unit}</span>
      </div>

      {!isCompact && (
        <div
          className="mt-4 pt-3 border-t border-black/5 flex justify-between
items-center text-[10px]"
        >
          <span className="font-medium">INTEGRITY STATUS: </span>
          <span
            className="font-black px-2 py-0.5 rounded bg-white/50 border
border-black/5"
          >
            {status === 'OK' ? 'SYSTEM SECURE' : 'ACTION REQUIRED'}
          </span>
        </div>
      )}
    </div>
  );
};
export default StatusCard;
