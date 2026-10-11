import React from 'react';
import { Badge } from './Badge';

export interface HeadingProps {
  badge?: string;
  title: string | React.ReactNode;
  subtitle?: string;
  align?: 'center' | 'left';
  dark?: boolean;
  className?: string;
}

export const Heading: React.FC<HeadingProps> = ({
  badge,
  title,
  subtitle,
  align = 'center',
  dark = false,
  className = '',
}) => {
  return (
    <div
      className={`max-w-2xl mb-12 ${
        align === 'center' ? 'mx-auto text-center' : 'text-left'
      } ${className}`}
    >
      {badge && (
        <div className="mb-3">
          <Badge variant="primary">{badge}</Badge>
        </div>
      )}
      <h2
        className={`font-display text-3xl md:text-5xl font-semibold leading-tight tracking-tight mb-3 ${
          dark ? 'text-white' : 'text-brand-text'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base md:text-lg ${dark ? 'text-white/80' : 'text-brand-text-muted'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
