import { HiStar } from 'react-icons/hi2';

const ProductRating = ({ rating = 0, small = false }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <HiStar
          key={star}
          className={`${
            small ? 'w-3.5 h-3.5' : 'w-5 h-5'
          } ${star <= Math.round(rating) ? 'text-amber-400' : 'text-slate-200'}`}
        />
      ))}
      {!small && <span className="ml-1 text-sm font-medium text-slate-600">{rating.toFixed(1)}</span>}
    </div>
  );
};

export default ProductRating;
