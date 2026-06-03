import { NavLink } from 'react-router-dom';
import { HiShoppingBag, HiChartBar, HiUsers, HiCube, HiClipboardDocumentList, HiCog6Tooth, HiArrowRightOnRectangle } from 'react-icons/hi2';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: HiChartBar },
    { name: 'Products', path: '/admin/products', icon: HiCube },
    { name: 'Orders', path: '/admin/orders', icon: HiClipboardDocumentList },
    { name: 'Customers', path: '/admin/users', icon: HiUsers },
    { name: 'Settings', path: '/admin/settings', icon: HiCog6Tooth },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
            <HiShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-bold">ShopSphere</span>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/admin'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`
            }
          >
            <Icon className="w-5 h-5" />
            {name}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-all duration-200">
          <HiArrowRightOnRectangle className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
