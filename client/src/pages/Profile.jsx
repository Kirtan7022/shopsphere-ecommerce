import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProfile } from '../redux/slices/authSlice';
import { fetchMyOrders } from '../redux/slices/orderSlice';
import { Navigate } from 'react-router-dom';
import { PageLoader } from '../components/common/Loader';
import { HiUser, HiEnvelope, HiPhone, HiMapPin, HiShoppingBag } from 'react-icons/hi2';
import { formatPrice } from '../utils/helpers';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading: authLoading } = useSelector((state) => state.auth);
  const { orders, loading: ordersLoading } = useSelector((state) => state.orders);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchProfile());
      dispatch(fetchMyOrders());
    }
  }, [dispatch, isAuthenticated]);

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (authLoading) return <PageLoader />;

  return (
    <div className="page-container py-8 pb-24 md:pb-8">
      <h1 className="section-title mb-8">My Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="card p-6">
          <div className="text-center mb-6">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-white">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">{user?.name}</h2>
            <span className="badge mt-2">{user?.role}</span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <HiEnvelope className="w-4 h-4 text-slate-400" />
              <span className="text-slate-600">{user?.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <HiPhone className="w-4 h-4 text-slate-400" />
              <span className="text-slate-600">{user?.phone || 'Not provided'}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <HiMapPin className="w-4 h-4 text-slate-400" />
              <span className="text-slate-600">
                {user?.address?.city ? `${user.address.city}, ${user.address.state}` : 'Not provided'}
              </span>
            </div>
          </div>
        </div>

        {/* Orders */}
        <div className="lg:col-span-2">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <HiShoppingBag className="w-5 h-5 text-indigo-500" /> Order History
            </h3>

            {ordersLoading ? (
              <PageLoader />
            ) : orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order._id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                    <div>
                      <p className="text-sm font-semibold text-slate-700">#{order._id?.slice(-8)}</p>
                      <p className="text-xs text-slate-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-900">{formatPrice(order.totalPrice)}</p>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700'
                        : order.status === 'Cancelled' ? 'bg-red-100 text-red-700'
                        : 'bg-amber-100 text-amber-700'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <HiShoppingBag className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                <p className="text-slate-400">No orders yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
