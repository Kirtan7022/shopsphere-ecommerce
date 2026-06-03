import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearError } from '../../redux/slices/authSlice';
import Input from '../common/Input';
import Button from '../common/Button';
import { HiUser, HiEnvelope, HiLockClosed } from 'react-icons/hi2';
import toast from 'react-hot-toast';

const RegisterForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [formError, setFormError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) dispatch(clearError());
    setFormError('');
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

    const result = await dispatch(register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    }));

    if (register.fulfilled.match(result)) {
      toast.success('Account created successfully!');
      navigate('/');
    }
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Create account</h2>
      <p className="text-slate-500 mb-8">Join ShopSphere and start shopping today</p>

      {(error || formError) && (
        <div className="p-4 mb-6 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600 font-medium">
          {error || formError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Full Name"
          name="name"
          type="text"
          icon={HiUser}
          placeholder="John Doe"
          value={formData.name}
          onChange={handleChange}
          required
        />
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
          placeholder="Min. 6 characters"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          icon={HiLockClosed}
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <Button type="submit" loading={loading} className="w-full">
          Create Account
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <Link to="/login" className="text-indigo-600 font-semibold hover:text-indigo-700">Sign in</Link>
      </p>
    </div>
  );
};

export default RegisterForm;
