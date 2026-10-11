import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'whatsapp';
  size?: 'sm' | 'md' | 'lg';
  asLink?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  asLink = false,
  href,
  target,
  rel,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 rounded-pill select-none';

  const variantClasses = {
    primary: 'bg-brand-primary text-white hover:bg-brand-primary-dark shadow-md hover:-translate-y-0.5',
    secondary: 'bg-brand-surface-elevated text-brand-text border border-brand-border hover:border-brand-primary hover:text-brand-primary-dark hover:-translate-y-0.5 shadow-sm',
    accent: 'bg-brand-accent text-white hover:bg-brand-accent-dark shadow-md hover:-translate-y-0.5',
    whatsapp: 'bg-[#25D366] text-white hover:bg-[#1EBE5D] shadow-md hover:-translate-y-0.5',
  }[variant];

  const sizeClasses = {
    sm: 'min-h-[40px] px-4 text-sm',
    md: 'min-h-[48px] px-6 text-[0.9375rem]',
    lg: 'min-h-[54px] px-8 text-base',
  }[size];

  const combinedClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`;

  if (asLink && href) {
    return (
      <a href={href} className={combinedClasses} target={target} rel={rel}>
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};
