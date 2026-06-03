import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductById, clearProductDetail } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { PageLoader } from '../components/common/Loader';
import ProductRating from '../components/product/ProductRating';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';
import { formatPrice } from '../utils/helpers';
import { HiShoppingCart, HiHeart, HiChevronLeft, HiMinus, HiPlus, HiTruck, HiShieldCheck, HiArrowPath } from 'react-icons/hi2';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading } = useSelector((state) => state.products);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchProductById(id));
    return () => dispatch(clearProductDetail());
  }, [dispatch, id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    toast.success('Added to cart!');
  };

  if (loading || !product) return <PageLoader />;

  return (
    <div className="page-container py-8 pb-24 md:pb-8">
      {/* Breadcrumb */}
      <Link to="/products" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 mb-8 transition-colors">
        <HiChevronLeft className="w-4 h-4" /> Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-3xl bg-slate-100 overflow-hidden">
            <img
              src={product.images?.[selectedImage]?.url || '/placeholder.jpg'}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {product.images?.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    i === selectedImage ? 'border-indigo-500 ring-4 ring-indigo-500/10' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            {product.category && <span className="badge mb-3">{product.category}</span>}
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">{product.name}</h1>
            <div className="flex items-center gap-3">
              <ProductRating rating={product.averageRating} />
              <span className="text-sm text-slate-400">({product.numReviews} reviews)</span>
            </div>
          </div>

          <div className="text-4xl font-extrabold gradient-text">
            {formatPrice(product.price)}
          </div>

          <p className="text-slate-600 leading-relaxed">{product.description}</p>

          {/* Stock */}
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
            </span>
          </div>

          {/* Quantity */}
          {product.stock > 0 && (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-700">Quantity:</span>
              <div className="flex items-center border-2 border-slate-200 rounded-xl overflow-hidden">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 text-slate-600 hover:bg-slate-50 transition-colors">
                  <HiMinus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 text-sm font-semibold border-x-2 border-slate-200">{quantity}</span>
                <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="px-3 py-2 text-slate-600 hover:bg-slate-50 transition-colors">
                  <HiPlus className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button onClick={handleAddToCart} disabled={product.stock === 0} className="flex-1">
              <HiShoppingCart className="w-5 h-5" /> Add to Cart
            </Button>
            <Button variant="secondary" className="!px-4">
              <HiHeart className="w-5 h-5" />
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100">
            {[
              { icon: HiTruck, text: 'Free Delivery' },
              { icon: HiShieldCheck, text: 'Warranty' },
              { icon: HiArrowPath, text: 'Easy Returns' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="text-center">
                <Icon className="w-6 h-6 text-indigo-500 mx-auto mb-1" />
                <span className="text-xs text-slate-500">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
