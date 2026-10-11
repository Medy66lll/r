import { useState, useEffect } from 'react';

export interface LiveStatus {
  isOpen: boolean;
  statusText: string;
}

export function useLiveHours(): LiveStatus {
  const [status, setStatus] = useState<LiveStatus>({
    isOpen: true,
    statusText: 'Ouvert aujourd’hui',
  });

  useEffect(() => {
    function computeStatus() {
      // Algeria is UTC+1 all year
      const now = new Date();
      const utcHours = now.getUTCHours();
      const algeriaHour = (utcHours + 1) % 24;
      const algeriaMinute = now.getUTCMinutes();
      const decimalTime = algeriaHour + algeriaMinute / 60;

      // Typical service: 11:30 to 00:30 (next day)
      const isOpen = decimalTime >= 11.5 || decimalTime < 0.75;
      setStatus({
        isOpen,
        statusText: isOpen ? 'Ouvert actuellement' : 'Fermé actuellement · Ouvre à 11h30',
      });
    }

    computeStatus();
    const interval = setInterval(computeStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return status;
}
