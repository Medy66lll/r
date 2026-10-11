import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  id,
  className = '',
  ...props
}, ref) => {
  const inputId = id || props.name;
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="text-xs font-bold uppercase tracking-wider text-brand-text">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={`w-full min-h-[46px] px-4 rounded-sm border border-brand-border bg-brand-surface text-brand-text text-[0.9375rem] focus:outline-none focus:border-brand-primary focus:bg-white focus:ring-2 focus:ring-brand-primary/20 transition-all ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-brand-accent font-medium">{error}</span>}
    </div>
  );
});
Input.displayName = 'Input';
