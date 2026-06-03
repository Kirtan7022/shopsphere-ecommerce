import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, clearError, clearMessage } from '../redux/slices/authSlice';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { HiEnvelope, HiArrowLeft, HiCheckCircle } from 'react-icons/hi2';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { loading, error, forgotPasswordSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    return () => {
      dispatch(clearError());
      dispatch(clearMessage());
    };
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  return (
    <div className="animate-fade-in">
      {forgotPasswordSuccess ? (
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <HiCheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-3">Check your email</h2>
          <p className="text-slate-500 mb-6 leading-relaxed">
            {message || 'We sent a password reset link to your email address. Please check your inbox.'}
          </p>
          <p className="text-sm text-slate-400 mb-8">
            Didn't receive the email? Check your spam folder or{' '}
            <button
              onClick={() => dispatch(clearMessage())}
              className="text-indigo-600 font-semibold hover:text-indigo-700"
            >
              try again
            </button>
          </p>
          <Link to="/login" className="btn-secondary inline-flex">
            <HiArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>
        </div>
      ) : (
        <>
          <Link to="/login" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-indigo-600 mb-6 transition-colors">
            <HiArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>

          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Forgot password?</h2>
          <p className="text-slate-500 mb-8">
            No worries! Enter your email and we'll send you a reset link.
          </p>

          {error && (
            <div className="p-4 mb-6 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email Address"
              name="email"
              type="email"
              icon={HiEnvelope}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) dispatch(clearError());
              }}
              required
            />

            <Button type="submit" loading={loading} className="w-full">
              Send Reset Link
            </Button>
          </form>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
