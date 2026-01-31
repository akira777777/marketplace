import React from 'react';

interface RatingProps {
  rating: number;
  totalReviews?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onRate?: (rating: number) => void;
}

export const Rating: React.FC<RatingProps> = ({ 
  rating, 
  totalReviews, 
  size = 'md', 
  interactive = false, 
  onRate 
}) => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const starSize = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const handleClick = (value: number) => {
    if (interactive && onRate) {
      onRate(value);
    }
  };

  return (
    <div className="flex items-center">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`material-symbols-outlined ${starSize[size]} ${
              star <= Math.floor(rating) 
                ? 'text-yellow-400' 
                : star <= rating 
                  ? 'text-yellow-300' // Half-star for decimal ratings
                  : 'text-white/30'
            } ${interactive ? 'cursor-pointer hover:text-yellow-300' : ''}`}
            onClick={() => handleClick(star)}
          >
            {star <= Math.floor(rating) 
              ? 'star' 
              : star <= rating 
                ? 'star_half' // Half-star for decimal ratings
                : 'star_outline'}
          </span>
        ))}
      </div>
      {totalReviews !== undefined && (
        <span className={`text-white/60 ${sizeClasses[size]} ml-2`}>
          {rating.toFixed(1)} ({totalReviews} reviews)
        </span>
      )}
    </div>
  );
};