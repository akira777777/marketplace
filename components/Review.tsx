import React from 'react';
import { Review } from '../types';
import { Rating } from './Rating';

interface ReviewProps {
  review: Review;
}

export const ReviewComponent: React.FC<ReviewProps> = ({ review }) => {
  return (
    <div className="bg-[#182b34] border border-[#315668] rounded-xl p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="text-white font-bold">{review.userName}</h4>
          <div className="flex items-center gap-2 mt-1">
            <Rating rating={review.rating} size="sm" />
            <span className="text-white/40 text-xs">{review.date}</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className="material-symbols-outlined text-white/50 text-sm">thumb_up</span>
          <span className="text-white/50 text-xs">{review.helpfulCount}</span>
        </div>
      </div>
      
      <h5 className="text-white font-semibold mb-2">{review.title}</h5>
      <p className="text-white/70 mb-4">{review.comment}</p>
      
      <div className="flex gap-3">
        <button className="text-primary text-sm font-semibold hover:underline flex items-center gap-1">
          <span className="material-symbols-outlined text-xs">thumb_up</span>
          Helpful
        </button>
        <button className="text-primary text-sm font-semibold hover:underline">
          Reply
        </button>
      </div>
    </div>
  );
};