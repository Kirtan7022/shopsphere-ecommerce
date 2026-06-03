import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../redux/slices/cartSlice';
import { formatPrice } from '../../utils/helpers';
import { HiTrash, HiMinus, HiPlus } from 'react-icons/hi2';
import { Link } from 'react-router-dom';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="card p-4 flex gap-4 animate-fade-in">
      {/* Image */}
      <Link to={`/product/${item._id}`} className="w-24 h-24 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
        <img src={item.images?.[0]?.url || '/placeholder.jpg'} alt={item.name} className="w-full h-full object-cover" />
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <Link to={`/product/${item._id}`} className="text-sm font-semibold text-slate-800 hover:text-indigo-600 transition-colors line-clamp-1">
          {item.name}
        </Link>
        <p className="text-xs text-slate-400 mt-0.5">{item.category}</p>
        <p className="text-lg font-extrabold gradient-text mt-2">{formatPrice(item.price)}</p>
      </div>

      {/* Quantity & Remove */}
      <div className="flex flex-col items-end justify-between">
        <button
          onClick={() => dispatch(removeFromCart(item._id))}
          className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
        >
          <HiTrash className="w-4 h-4" />
        </button>

        <div className="flex items-center border-2 border-slate-200 rounded-lg overflow-hidden">
          <button
            onClick={() => dispatch(updateQuantity({ id: item._id, quantity: item.quantity - 1 }))}
            className="px-2 py-1 text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <HiMinus className="w-3 h-3" />
          </button>
          <span className="px-3 py-1 text-xs font-semibold border-x-2 border-slate-200">{item.quantity}</span>
          <button
            onClick={() => dispatch(updateQuantity({ id: item._id, quantity: item.quantity + 1 }))}
            className="px-2 py-1 text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <HiPlus className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
