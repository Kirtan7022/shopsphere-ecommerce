import { Link } from 'react-router-dom';
import { HiShoppingBag } from 'react-icons/hi2';
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Shop: [
      { name: 'All Products', path: '/products' },
      { name: 'New Arrivals', path: '/products?sort=-createdAt' },
      { name: 'Best Sellers', path: '/products?sort=-numReviews' },
      { name: 'Deals', path: '/products?sort=price' },
    ],
    Account: [
      { name: 'My Profile', path: '/profile' },
      { name: 'Order History', path: '/profile' },
      { name: 'Shopping Cart', path: '/cart' },
      { name: 'Wishlist', path: '/products' },
    ],
    Company: [
      { name: 'About Us', path: '/' },
      { name: 'Contact', path: '/' },
      { name: 'Careers', path: '/' },
      { name: 'Blog', path: '/' },
    ],
    Support: [
      { name: 'Help Center', path: '/' },
      { name: 'Shipping Info', path: '/' },
      { name: 'Returns', path: '/' },
      { name: 'Privacy Policy', path: '/' },
    ],
  };

  const socialIcons = [
    { icon: FaFacebookF, href: '#', label: 'Facebook' },
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaInstagram, href: '#', label: 'Instagram' },
    { icon: FaGithub, href: '#', label: 'GitHub' },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Newsletter Section */}
      <div className="border-b border-slate-800">
        <div className="page-container py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Stay in the loop</h3>
              <p className="text-slate-400 text-sm">Get the latest deals and new arrivals straight to your inbox.</p>
            </div>
            <form className="flex gap-3 w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-72 px-4 py-3 rounded-xl bg-slate-800 border-2 border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
              />
              <button className="btn-primary !rounded-xl whitespace-nowrap">Subscribe</button>
            </form>
          </div>
        </div>
      </div>

      {/* Links Grid */}
      <div className="page-container py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                <HiShoppingBag className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">ShopSphere</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Your premium destination for quality products and exceptional shopping.
            </p>
            <div className="flex gap-3">
              {socialIcons.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="page-container py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">&copy; {currentYear} ShopSphere. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Terms</Link>
            <Link to="/" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Privacy</Link>
            <Link to="/" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
