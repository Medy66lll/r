import React from 'react';

export interface RatingStarsProps {
  rating: number;
  maxStars?: number;
  count?: number;
  className?: string;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxStars = 5,
  count,
  className = '',
}) => {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <div className="flex gap-0.5 text-brand-gold text-sm" aria-label={`${rating} étoiles sur ${maxStars}`}>
        {'★'.repeat(maxStars)}
      </div>
      <span className="text-sm font-bold text-brand-text">
        {rating.toFixed(1)} {count !== undefined && <span className="font-normal text-brand-text-muted">({count} avis)</span>}
      </span>
    </div>
  );
};
