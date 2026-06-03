import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import CheckoutForm from '../components/checkout/CheckoutForm';
import OrderSummary from '../components/checkout/OrderSummary';
import PaymentForm from '../components/checkout/PaymentForm';
import { HiMapPin, HiCreditCard, HiCheckCircle } from 'react-icons/hi2';

const steps = [
  { id: 1, name: 'Shipping', icon: HiMapPin },
  { id: 2, name: 'Payment', icon: HiCreditCard },
  { id: 3, name: 'Review', icon: HiCheckCircle },
];

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { cartItems } = useSelector((state) => state.cart);

  if (cartItems.length === 0) return <Navigate to="/cart" />;

  return (
    <div className="page-container py-8 pb-24 md:pb-8">
      <h1 className="section-title mb-8">Checkout</h1>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-12">
        {steps.map((step, i) => (
          <div key={step.id} className="flex items-center">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              currentStep >= step.id ? 'bg-indigo-100 text-indigo-700' : 'text-slate-400'
            }`}>
              <step.icon className="w-5 h-5" />
              <span className="text-sm font-semibold hidden sm:block">{step.name}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-12 h-0.5 mx-2 rounded ${currentStep > step.id ? 'bg-indigo-400' : 'bg-slate-200'}`} />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {currentStep === 1 && <CheckoutForm onNext={() => setCurrentStep(2)} />}
          {currentStep === 2 && <PaymentForm onNext={() => setCurrentStep(3)} onBack={() => setCurrentStep(1)} />}
          {currentStep === 3 && <OrderSummary onBack={() => setCurrentStep(2)} />}
        </div>
        <div>
          <div className="card p-6 sticky top-24">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Cart Summary</h3>
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
                    <img src={item.images?.[0]?.url || '/placeholder.jpg'} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-700 truncate">{item.name}</p>
                    <p className="text-xs text-slate-400">Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
