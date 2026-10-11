import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'accent' | 'muted' | 'success';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  className = '',
}) => {
  const variantClasses = {
    primary: 'bg-brand-primary-subtle text-brand-primary-dark border-brand-primary/25',
    accent: 'bg-brand-accent/10 text-brand-accent border-brand-accent/20',
    muted: 'bg-brand-surface-muted text-brand-text-muted border-brand-border-subtle',
    success: 'bg-brand-success-bg text-brand-success border-brand-success/20',
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-pill text-xs font-bold uppercase tracking-wider border ${variantClasses} ${className}`}
    >
      {children}
    </span>
  );
};
