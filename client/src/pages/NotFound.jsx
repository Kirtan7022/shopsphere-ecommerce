import { Link } from 'react-router-dom';
import { HiHome } from 'react-icons/hi2';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-8">
      <div className="text-center max-w-lg animate-fade-in">
        <div className="text-8xl font-black gradient-text mb-4">404</div>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-3">Page Not Found</h1>
        <p className="text-slate-500 mb-8 leading-relaxed">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary">
          <HiHome className="w-5 h-5" /> Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
