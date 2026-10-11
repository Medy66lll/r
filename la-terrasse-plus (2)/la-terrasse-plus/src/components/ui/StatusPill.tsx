import React from 'react';

export interface StatusPillProps {
  isOpen: boolean;
  openLabel?: string;
  closedLabel?: string;
  className?: string;
}

export const StatusPill: React.FC<StatusPillProps> = ({
  isOpen,
  openLabel = 'Ouvert actuellement',
  closedLabel = 'Fermé actuellement · Ouvre à 11h30',
  className = '',
}) => {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-pill text-xs font-semibold border ${
        isOpen
          ? 'bg-brand-success-bg text-brand-success border-brand-success/20'
          : 'bg-black/5 text-brand-text-muted border-brand-border'
      } ${className}`}
    >
      <span className="relative flex h-2 w-2">
        {isOpen && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-success opacity-75" />
        )}
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${
            isOpen ? 'bg-brand-success' : 'bg-brand-text-muted'
          }`}
        />
      </span>
      <span>{isOpen ? openLabel : closedLabel}</span>
    </div>
  );
};
