import { Outlet, Link } from 'react-router-dom';
import { HiShoppingBag } from 'react-icons/hi2';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
        {/* Animated background shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-pink-400/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <Link to="/" className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <HiShoppingBag className="w-7 h-7" />
            </div>
            <span className="text-2xl font-bold tracking-tight">ShopSphere</span>
          </Link>

          <h1 className="text-5xl font-extrabold leading-tight mb-6">
            Discover the
            <br />
            <span className="text-yellow-300">Future of Shopping</span>
          </h1>
          <p className="text-lg text-white/70 max-w-md leading-relaxed">
            Join thousands of happy customers who trust ShopSphere for premium products, 
            fast delivery, and an unmatched shopping experience.
          </p>

          <div className="mt-12 flex items-center gap-8">
            <div>
              <div className="text-3xl font-bold">50K+</div>
              <div className="text-sm text-white/60">Happy Customers</div>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div>
              <div className="text-3xl font-bold">10K+</div>
              <div className="text-sm text-white/60">Products</div>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div>
              <div className="text-3xl font-bold">99%</div>
              <div className="text-sm text-white/60">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Forms */}
      <div className="flex-1 flex items-center justify-center p-8 bg-slate-50">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              <HiShoppingBag className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">ShopSphere</span>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
