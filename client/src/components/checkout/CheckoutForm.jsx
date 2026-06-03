import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../../redux/slices/cartSlice';
import Input from '../common/Input';
import Button from '../common/Button';
import { HiArrowRight } from 'react-icons/hi2';

const CheckoutForm = ({ onNext }) => {
  const dispatch = useDispatch();
  const { shippingAddress } = useSelector((state) => state.cart);

  const [form, setForm] = useState({
    street: shippingAddress?.street || '',
    city: shippingAddress?.city || '',
    state: shippingAddress?.state || '',
    zipCode: shippingAddress?.zipCode || '',
    country: shippingAddress?.country || 'India',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress(form));
    onNext();
  };

  return (
    <div className="card p-6">
      <h2 className="text-xl font-bold text-slate-900 mb-6">Shipping Address</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Street Address" name="street" value={form.street} onChange={handleChange} placeholder="123 Main St" required />
        <div className="grid grid-cols-2 gap-4">
          <Input label="City" name="city" value={form.city} onChange={handleChange} placeholder="Mumbai" required />
          <Input label="State" name="state" value={form.state} onChange={handleChange} placeholder="Maharashtra" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="ZIP Code" name="zipCode" value={form.zipCode} onChange={handleChange} placeholder="400001" required />
          <Input label="Country" name="country" value={form.country} onChange={handleChange} placeholder="India" required />
        </div>
        <Button type="submit" className="w-full mt-4">
          Continue to Payment <HiArrowRight className="w-5 h-5" />
        </Button>
      </form>
    </div>
  );
};

export default CheckoutForm;
