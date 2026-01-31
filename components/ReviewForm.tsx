import React, { useState } from 'react';
import { Rating } from './Rating';

interface ReviewFormProps {
  onSubmit: (reviewData: { rating: number; title: string; comment: string }) => void;
  onCancel: () => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit, onCancel }) => {
  const [rating, setRating] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0 && title.trim() && comment.trim()) {
      onSubmit({ rating, title, comment });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#182b34] border border-[#315668] rounded-xl p-6">
      <div className="mb-4">
        <label className="block text-white font-medium mb-2">Your Rating</label>
        <Rating rating={rating} interactive={true} onRate={setRating} size="lg" />
      </div>
      
      <div className="mb-4">
        <label className="block text-white font-medium mb-2">Review Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Summarize your experience"
          className="w-full bg-[#223c49] text-white rounded-lg px-4 py-3 border border-[#315668] focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50"
          required
        />
      </div>
      
      <div className="mb-6">
        <label className="block text-white font-medium mb-2">Your Review</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your detailed experience..."
          rows={4}
          className="w-full bg-[#223c49] text-white rounded-lg px-4 py-3 border border-[#315668] focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none"
          required
        ></textarea>
      </div>
      
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={!rating || !title.trim() || !comment.trim()}
          className="flex-1 bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Submit Review
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 bg-[#223c49] text-white font-bold py-3 rounded-lg hover:bg-[#2d4e5f] transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};