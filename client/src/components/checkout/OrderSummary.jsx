import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { placeOrder } from '../../redux/slices/orderSlice';
import { clearCart } from '../../redux/slices/cartSlice';
import { formatPrice } from '../../utils/helpers';
import Button from '../common/Button';
import toast from 'react-hot-toast';
import { HiArrowLeft, HiCheck } from 'react-icons/hi2';

const OrderSummary = ({ onBack }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, subtotal, tax, shipping, totalPrice, shippingAddress, paymentMethod } = useSelector((state) => state.cart);
  const { loading } = useSelector((state) => state.orders);

  const handlePlaceOrder = async () => {
    const orderData = {
      orderItems: cartItems.map((item) => ({
        product: item._id,
        name: item.name,
        image: item.images?.[0]?.url || '',
        price: item.price,
        quantity: item.quantity,
      })),
      shippingAddress,
      paymentMethod,
      itemsPrice: subtotal,
      taxPrice: tax,
      shippingPrice: shipping,
      totalPrice,
    };

    const result = await dispatch(placeOrder(orderData));
    if (placeOrder.fulfilled.match(result)) {
      dispatch(clearCart());
      toast.success('Order placed successfully!');
      navigate('/');
    } else {
      toast.error('Failed to place order');
    }
  };

  return (
    <div className="card p-6">
      <h2 className="text-xl font-bold text-slate-900 mb-6">Review Your Order</h2>

      {/* Shipping Info */}
      <div className="mb-6 p-4 rounded-xl bg-slate-50">
        <h4 className="text-sm font-semibold text-slate-700 mb-2">Shipping Address</h4>
        <p className="text-sm text-slate-600">
          {shippingAddress?.street}, {shippingAddress?.city}, {shippingAddress?.state} - {shippingAddress?.zipCode}, {shippingAddress?.country}
        </p>
      </div>

      {/* Payment Method */}
      <div className="mb-6 p-4 rounded-xl bg-slate-50">
        <h4 className="text-sm font-semibold text-slate-700 mb-2">Payment Method</h4>
        <p className="text-sm text-slate-600">{paymentMethod || 'Cash on Delivery'}</p>
      </div>

      {/* Order Items */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-slate-700 mb-3">Order Items</h4>
        <div className="space-y-3">
          {cartItems.map((item) => (
            <div key={item._id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-slate-200 overflow-hidden flex-shrink-0">
                  <img src={item.images?.[0]?.url || '/placeholder.jpg'} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">{item.name}</p>
                  <p className="text-xs text-slate-400">Qty: {item.quantity}</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-slate-700">{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Totals */}
      <div className="space-y-2 mb-6 p-4 rounded-xl bg-slate-50">
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Subtotal</span>
          <span className="font-medium text-slate-700">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Tax</span>
          <span className="font-medium text-slate-700">{formatPrice(tax)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Shipping</span>
          <span className={`font-medium ${shipping === 0 ? 'text-green-600' : 'text-slate-700'}`}>
            {shipping === 0 ? 'FREE' : formatPrice(shipping)}
          </span>
        </div>
        <hr className="border-slate-200" />
        <div className="flex justify-between">
          <span className="font-semibold text-slate-900">Total</span>
          <span className="text-lg font-extrabold gradient-text">{formatPrice(totalPrice)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="secondary" onClick={onBack} className="flex-1">
          <HiArrowLeft className="w-4 h-4" /> Back
        </Button>
        <Button onClick={handlePlaceOrder} loading={loading} className="flex-1">
          <HiCheck className="w-5 h-5" /> Place Order
        </Button>
      </div>
    </div>
  );
};

export default OrderSummary;
