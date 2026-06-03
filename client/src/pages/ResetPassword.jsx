import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, clearError, clearMessage } from '../redux/slices/authSlice';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { HiLockClosed, HiCheckCircle, HiShieldCheck } from 'react-icons/hi2';

const ResetPassword = () => {
  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
  const [formError, setFormError] = useState('');
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, resetPasswordSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    return () => {
      dispatch(clearError());
      dispatch(clearMessage());
    };
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormError('');
    if (error) dispatch(clearError());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setFormError('Password must be at least 6 characters');
      return;
    }

    dispatch(resetPassword({
      token,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    }));
  };

  if (resetPasswordSuccess) {
    return (
      <div className="animate-fade-in text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <HiCheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 mb-3">Password reset!</h2>
        <p className="text-slate-500 mb-8 leading-relaxed">
          {message || 'Your password has been successfully reset. You can now log in with your new password.'}
        </p>
        <Link to="/login" className="btn-primary inline-flex">
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
          <HiShieldCheck className="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Reset Password</h2>
          <p className="text-sm text-slate-500">Choose a strong new password</p>
        </div>
      </div>

      {(error || formError) && (
        <div className="p-4 mb-6 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600 font-medium">
          {error || formError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="New Password"
          name="password"
          type="password"
          icon={HiLockClosed}
          placeholder="Min. 6 characters"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Input
          label="Confirm New Password"
          name="confirmPassword"
          type="password"
          icon={HiLockClosed}
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        {/* Password strength hints */}
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-slate-500">Password must:</p>
          <div className="flex items-center gap-2 text-xs">
            <div className={`w-1.5 h-1.5 rounded-full ${formData.password.length >= 6 ? 'bg-green-500' : 'bg-slate-300'}`} />
            <span className={formData.password.length >= 6 ? 'text-green-600' : 'text-slate-400'}>Be at least 6 characters</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className={`w-1.5 h-1.5 rounded-full ${/\d/.test(formData.password) ? 'bg-green-500' : 'bg-slate-300'}`} />
            <span className={/\d/.test(formData.password) ? 'text-green-600' : 'text-slate-400'}>Contain at least one number</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className={`w-1.5 h-1.5 rounded-full ${formData.password === formData.confirmPassword && formData.confirmPassword ? 'bg-green-500' : 'bg-slate-300'}`} />
            <span className={formData.password === formData.confirmPassword && formData.confirmPassword ? 'text-green-600' : 'text-slate-400'}>Passwords match</span>
          </div>
        </div>

        <Button type="submit" loading={loading} className="w-full">
          Reset Password
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-500">
        Remember your password?{' '}
        <Link to="/login" className="text-indigo-600 font-semibold hover:text-indigo-700">Sign in</Link>
      </p>
    </div>
  );
};

export default ResetPassword;
