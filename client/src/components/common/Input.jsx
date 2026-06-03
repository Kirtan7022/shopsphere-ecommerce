import { forwardRef } from 'react';

const Input = forwardRef(({ label, error, icon: Icon, className = '', ...props }, ref) => {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        )}
        <input
          ref={ref}
          className={`input-field ${Icon ? '!pl-10' : ''} ${error ? '!border-red-400 !ring-red-500/10' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
