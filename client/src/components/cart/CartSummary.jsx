import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/helpers';
import { HiArrowRight, HiTruck } from 'react-icons/hi2';

const CartSummary = () => {
  const { subtotal, tax, shipping, totalPrice, totalItems } = useSelector((state) => state.cart);

  return (
    <div className="card p-6 sticky top-24 space-y-5">
      <h3 className="text-lg font-semibold text-slate-900">Order Summary</h3>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Subtotal ({totalItems} items)</span>
          <span className="font-medium text-slate-700">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">GST (18%)</span>
          <span className="font-medium text-slate-700">{formatPrice(tax)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Shipping</span>
          <span className={`font-medium ${shipping === 0 ? 'text-green-600' : 'text-slate-700'}`}>
            {shipping === 0 ? 'FREE' : formatPrice(shipping)}
          </span>
        </div>
        <hr className="border-slate-100" />
        <div className="flex justify-between">
          <span className="font-semibold text-slate-900">Total</span>
          <span className="text-xl font-extrabold gradient-text">{formatPrice(totalPrice)}</span>
        </div>
      </div>

      {shipping > 0 && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 text-amber-700">
          <HiTruck className="w-5 h-5 flex-shrink-0" />
          <p className="text-xs font-medium">Add {formatPrice(999 - (subtotal || 0))} more for free shipping!</p>
        </div>
      )}

      <Link to="/checkout" className="btn-primary w-full">
        Checkout <HiArrowRight className="w-5 h-5" />
      </Link>
    </div>
  );
};

export default CartSummary;
