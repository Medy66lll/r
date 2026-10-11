import React from 'react';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'narrow';
}

export const Container: React.FC<ContainerProps> = ({
  children,
  size = 'default',
  className = '',
  ...props
}) => {
  const maxW = size === 'narrow' ? 'max-w-3xl' : 'max-w-[1240px]';
  return (
    <div className={`w-full ${maxW} mx-auto px-5 ${className}`} {...props}>
      {children}
    </div>
  );
};
