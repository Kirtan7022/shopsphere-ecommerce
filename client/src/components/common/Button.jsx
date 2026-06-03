import Loader from './Loader';

const variants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  danger: 'btn-danger',
  ghost: 'inline-flex items-center justify-center gap-2 px-4 py-2.5 text-slate-600 font-medium rounded-xl hover:bg-slate-100 active:scale-[0.97] transition-all duration-200',
};

const sizes = {
  sm: '!px-4 !py-2 !text-sm',
  md: '',
  lg: '!px-8 !py-4 !text-lg',
};

const Button = ({ children, variant = 'primary', size = 'md', loading = false, className = '', ...props }) => {
  return (
    <button
      className={`${variants[variant]} ${sizes[size]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? <Loader size="sm" /> : children}
    </button>
  );
};

export default Button;
