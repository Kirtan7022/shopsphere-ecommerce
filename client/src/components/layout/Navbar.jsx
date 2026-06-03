import { NavLink } from 'react-router-dom';
import { HiHome, HiShoppingBag, HiShoppingCart, HiUser } from 'react-icons/hi2';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { totalItems } = useSelector((state) => state.cart);

  const links = [
    { name: 'Home', path: '/', icon: HiHome },
    { name: 'Products', path: '/products', icon: HiShoppingBag },
    { name: 'Cart', path: '/cart', icon: HiShoppingCart, badge: totalItems },
    { name: 'Profile', path: '/profile', icon: HiUser },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass border-t border-slate-200/50">
      <div className="flex items-center justify-around py-2">
        {links.map(({ name, path, icon: Icon, badge }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200 ${
                isActive ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
              }`
            }
          >
            <div className="relative">
              <Icon className="w-5 h-5" />
              {badge > 0 && (
                <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-indigo-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {badge > 9 ? '9+' : badge}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium">{name}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
