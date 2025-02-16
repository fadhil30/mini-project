"use client";
import { useState } from "react";

interface ReviewFormProps {
  eventId: string;
  onSubmit: (eventId: string, review: string, rating: number) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ eventId, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(eventId, review, rating);
    setReview("");
    setRating(0);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div>
        <label className="block mb-2">Rating:</label>
        <select
          value={rating}
          onChange={(e) => handleRatingChange(Number(e.target.value))}
          className="border rounded p-2"
          required
        >
          <option value={0}>Select Rating</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div className="mt-4">
        <textarea
          value={review}
          onChange={handleReviewChange}
          placeholder="Write your review here..."
          className="w-full p-2 border rounded"
          rows={4}
          required
        />
      </div>
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
