"use client";

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export function LiveTime() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const indiaTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));
      const timeString = indiaTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata'
      });
      setTime(timeString);
    };

    // Update time immediately
    updateTime();
    
    // Update time every second
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-1 text-xs">
      <Clock className="h-3 w-3" />
      <span className="font-mono font-medium">{time}</span>
    </div>
  );
} 