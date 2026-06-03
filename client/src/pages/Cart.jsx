import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import { clearCart } from '../redux/slices/cartSlice';
import { HiShoppingCart, HiArrowLeft, HiTrash } from 'react-icons/hi2';
import Button from '../components/common/Button';

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <div className="page-container py-8 pb-24 md:pb-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="section-title">Shopping Cart</h1>
          <p className="section-subtitle mt-1">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart</p>
        </div>
        {cartItems.length > 0 && (
          <Button variant="ghost" onClick={() => dispatch(clearCart())} className="!text-red-500 hover:!bg-red-50">
            <HiTrash className="w-4 h-4" /> Clear All
          </Button>
        )}
      </div>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>

          {/* Summary */}
          <div>
            <CartSummary />
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <HiShoppingCart className="w-20 h-20 text-slate-200 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-slate-700 mb-2">Your cart is empty</h3>
          <p className="text-slate-400 mb-8">Looks like you haven't added anything yet</p>
          <Link to="/products" className="btn-primary">
            <HiArrowLeft className="w-5 h-5" /> Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
