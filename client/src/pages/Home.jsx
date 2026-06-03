import { Link } from 'react-router-dom';
import { HiArrowRight, HiTruck, HiShieldCheck, HiCreditCard, HiArrowPath } from 'react-icons/hi2';

const features = [
  { icon: HiTruck, title: 'Free Shipping', desc: 'On orders above ₹999' },
  { icon: HiShieldCheck, title: 'Secure Payment', desc: '100% protected' },
  { icon: HiCreditCard, title: 'Easy Returns', desc: '30-day return policy' },
  { icon: HiArrowPath, title: '24/7 Support', desc: 'Round the clock help' },
];

const categories = [
  { name: 'Electronics', emoji: '📱', color: 'from-blue-500 to-cyan-400' },
  { name: 'Fashion', emoji: '👗', color: 'from-pink-500 to-rose-400' },
  { name: 'Home & Living', emoji: '🏠', color: 'from-amber-500 to-yellow-400' },
  { name: 'Sports', emoji: '⚽', color: 'from-green-500 to-emerald-400' },
  { name: 'Books', emoji: '📚', color: 'from-purple-500 to-violet-400' },
  { name: 'Beauty', emoji: '💄', color: 'from-red-500 to-pink-400' },
];

const Home = () => {
  return (
    <div className="pb-12 md:pb-0">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative page-container py-20 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-8 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              New Collection 2025 — Now Live
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6 animate-slide-up">
              Discover Your
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Perfect Style
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-xl mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Explore thousands of premium products curated just for you. 
              Quality, style, and unbeatable prices — all in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link to="/products" className="btn-primary !px-8 !py-4 !text-base !rounded-2xl">
                Shop Now <HiArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/products?sort=-numReviews" className="btn-secondary !px-8 !py-4 !text-base !rounded-2xl !bg-white/10 !border-white/20 !text-white hover:!bg-white/20">
                Trending
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 mt-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              {[{ value: '50K+', label: 'Customers' }, { value: '10K+', label: 'Products' }, { value: '4.9', label: 'Rating' }].map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-white border-b border-slate-100">
        <div className="page-container py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
                  <p className="text-xs text-slate-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="page-container py-16">
        <div className="text-center mb-12">
          <h2 className="section-title">Shop by Category</h2>
          <p className="section-subtitle mx-auto mt-3">Browse our wide selection of curated categories</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(({ name, emoji, color }) => (
            <Link
              key={name}
              to={`/products?category=${name}`}
              className="group card p-6 text-center hover:-translate-y-1"
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {emoji}
              </div>
              <h3 className="text-sm font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors">{name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="page-container pb-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 p-10 lg:p-16">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-20 w-32 h-32 bg-white/10 rounded-full translate-y-1/2" />

          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">
              Get 20% off your first order!
            </h2>
            <p className="text-indigo-100 mb-8 text-lg">
              Sign up today and enjoy exclusive discounts, early access to sales, and much more.
            </p>
            <Link to="/register" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 font-bold rounded-2xl hover:bg-indigo-50 active:scale-[0.97] transition-all duration-200 shadow-xl shadow-black/10">
              Create Account <HiArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
