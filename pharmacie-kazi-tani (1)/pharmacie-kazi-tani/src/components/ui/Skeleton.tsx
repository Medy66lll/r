import React from 'react';

export interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return (
    <div
      className={`animate-pulse bg-brand-surface-muted rounded-md ${className}`}
      aria-hidden="true"
    />
  );
};
