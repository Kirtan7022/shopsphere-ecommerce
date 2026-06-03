import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import ProductRating from './ProductRating';
import { formatPrice } from '../../utils/helpers';
import toast from 'react-hot-toast';
import { HiShoppingCart, HiHeart } from 'react-icons/hi2';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <Link to={`/product/${product._id}`} className="group card overflow-hidden">
      {/* Image */}
      <div className="relative aspect-square bg-slate-100 overflow-hidden">
        <img
          src={product.images?.[0]?.url || '/placeholder.jpg'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
            <button onClick={handleAddToCart} className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white rounded-xl text-sm font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 shadow-lg">
              <HiShoppingCart className="w-4 h-4" /> Add to Cart
            </button>
            <button onClick={(e) => e.preventDefault()} className="p-2.5 bg-white rounded-xl text-slate-400 hover:text-red-500 transition-colors shadow-lg">
              <HiHeart className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Badges */}
        {product.featured && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold uppercase rounded-lg shadow-lg">
            Featured
          </span>
        )}
        {product.stock === 0 && (
          <span className="absolute top-3 right-3 px-2.5 py-1 bg-red-500 text-white text-[10px] font-bold uppercase rounded-lg">
            Sold Out
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-indigo-600 font-semibold uppercase tracking-wide">{product.category}</span>
          <ProductRating rating={product.averageRating} small />
        </div>
        <h3 className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-lg font-extrabold gradient-text">{formatPrice(product.price)}</span>
          <span className="text-xs text-slate-400">{product.numReviews} reviews</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
