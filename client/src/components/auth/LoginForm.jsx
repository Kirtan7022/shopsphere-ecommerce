import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../../redux/slices/authSlice';
import Input from '../common/Input';
import Button from '../common/Button';
import { HiEnvelope, HiLockClosed } from 'react-icons/hi2';
import toast from 'react-hot-toast';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) dispatch(clearError());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login(formData));
    if (login.fulfilled.match(result)) {
      toast.success('Welcome back!');
      navigate('/');
    }
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Welcome back</h2>
      <p className="text-slate-500 mb-8">Sign in to your account to continue shopping</p>

      {error && (
        <div className="p-4 mb-6 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600 font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Email"
          name="email"
          type="email"
          icon={HiEnvelope}
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          label="Password"
          name="password"
          type="password"
          icon={HiLockClosed}
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" loading={loading} className="w-full">
          Sign In
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-500">
        Don't have an account?{' '}
        <Link to="/register" className="text-indigo-600 font-semibold hover:text-indigo-700">Create one</Link>
      </p>
    </div>
  );
};

export default LoginForm;
