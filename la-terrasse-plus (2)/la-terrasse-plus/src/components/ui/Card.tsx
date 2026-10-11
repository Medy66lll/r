import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'elevated' | 'surface' | 'dark';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'elevated',
  className = '',
  ...props
}) => {
  const variantClasses = {
    elevated: 'bg-brand-surface-elevated text-brand-text border-brand-border shadow-sm hover:shadow-md',
    surface: 'bg-brand-surface text-brand-text border-brand-border-subtle shadow-sm',
    dark: 'bg-brand-surface-dark-elevated text-brand-text-inverse border-brand-border-dark shadow-md',
  }[variant];

  return (
    <div
      className={`rounded-lg border p-6 transition-all duration-300 ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
