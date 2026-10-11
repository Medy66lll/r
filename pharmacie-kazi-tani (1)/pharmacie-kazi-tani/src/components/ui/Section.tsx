import React from 'react';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'muted' | 'dark';
}

export const Section: React.FC<SectionProps> = ({
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  const bgClasses = {
    default: 'bg-brand-surface text-brand-text',
    muted: 'bg-brand-surface-muted text-brand-text',
    dark: 'bg-brand-surface-dark text-brand-text-inverse',
  }[variant];

  return (
    <section className={`py-16 md:py-24 relative ${bgClasses} ${className}`} {...props}>
      {children}
    </section>
  );
};
