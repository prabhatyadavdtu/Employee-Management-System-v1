import React, { useState, useEffect } from 'react';
import { Users, Building2 } from 'lucide-react';

const AnimatedLogo = () => {
  const [logoHue, setLogoHue] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setLogoHue(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="relative">
      <div
        className="absolute inset-0"
        style={{
          background: `conic-gradient(from 0deg, hsl(${logoHue}, 70%, 60%), hsl(${(logoHue + 120) % 360}, 70%, 60%), hsl(${(logoHue + 240) % 360}, 70%, 60%), hsl(${logoHue}, 70%, 60%))`,
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          filter: 'blur(8px)',
          opacity: 0.7,
          animation: 'spin 3s linear infinite'
        }}
      />
      <div
        className="relative p-3 rounded-2xl shadow-2xl transform hover:scale-110 transition-all duration-300"
        style={{
          background: `linear-gradient(45deg, hsl(${logoHue}, 70%, 55%), hsl(${(logoHue + 60) % 360}, 70%, 55%), hsl(${(logoHue + 120) % 360}, 70%, 55%))`,
          animation: 'pulse 2s infinite'
        }}
      >
        <Building2 className="h-6 w-6 text-white drop-shadow-lg" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-ping" />
      </div>
    </div>
  );
};

export default AnimatedLogo;