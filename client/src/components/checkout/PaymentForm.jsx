import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../../redux/slices/cartSlice';
import Button from '../common/Button';
import { HiArrowLeft, HiArrowRight, HiCreditCard, HiBanknotes } from 'react-icons/hi2';

const paymentOptions = [
  { id: 'COD', label: 'Cash on Delivery', icon: HiBanknotes, desc: 'Pay when you receive your order' },
  { id: 'Card', label: 'Credit / Debit Card', icon: HiCreditCard, desc: 'Pay securely with your card' },
];

const PaymentForm = ({ onNext, onBack }) => {
  const dispatch = useDispatch();
  const { paymentMethod } = useSelector((state) => state.cart);
  const [selected, setSelected] = useState(paymentMethod || 'COD');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(selected));
    onNext();
  };

  return (
    <div className="card p-6">
      <h2 className="text-xl font-bold text-slate-900 mb-6">Payment Method</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {paymentOptions.map(({ id, label, icon: Icon, desc }) => (
          <label
            key={id}
            className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
              selected === id
                ? 'border-indigo-500 bg-indigo-50 ring-4 ring-indigo-500/10'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={id}
              checked={selected === id}
              onChange={() => setSelected(id)}
              className="sr-only"
            />
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
              selected === id ? 'bg-indigo-100' : 'bg-slate-100'
            }`}>
              <Icon className={`w-6 h-6 ${selected === id ? 'text-indigo-600' : 'text-slate-400'}`} />
            </div>
            <div>
              <p className={`text-sm font-semibold ${selected === id ? 'text-indigo-700' : 'text-slate-700'}`}>{label}</p>
              <p className="text-xs text-slate-400">{desc}</p>
            </div>
            <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              selected === id ? 'border-indigo-500' : 'border-slate-300'
            }`}>
              {selected === id && <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />}
            </div>
          </label>
        ))}

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={onBack} className="flex-1">
            <HiArrowLeft className="w-4 h-4" /> Back
          </Button>
          <Button type="submit" className="flex-1">
            Review Order <HiArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
