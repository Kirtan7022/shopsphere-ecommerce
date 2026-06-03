import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductById, clearProductDetail, addReview, clearReviewStatus } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { PageLoader } from '../components/common/Loader';
import ProductRating from '../components/product/ProductRating';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';
import { formatPrice } from '../utils/helpers';
import {
  HiShoppingCart, HiHeart, HiChevronLeft, HiMinus, HiPlus,
  HiTruck, HiShieldCheck, HiArrowPath, HiStar, HiUser,
} from 'react-icons/hi2';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, reviewLoading, reviewSuccess } = useSelector((state) => state.products);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Review form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    dispatch(fetchProductById(id));
    return () => dispatch(clearProductDetail());
  }, [dispatch, id]);

  useEffect(() => {
    if (reviewSuccess) {
      toast.success('Review submitted!');
      setShowReviewForm(false);
      setReviewComment('');
      setReviewRating(5);
      dispatch(clearReviewStatus());
      dispatch(fetchProductById(id));
    }
  }, [reviewSuccess, dispatch, id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    toast.success('Added to cart!');
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!reviewComment.trim()) {
      toast.error('Please write a comment');
      return;
    }
    dispatch(addReview({ id, reviewData: { rating: reviewRating, comment: reviewComment } }));
  };

  if (loading || !product) return <PageLoader />;

  const alreadyReviewed = product.reviews?.some((r) => r.user?._id === user?._id || r.user === user?._id);

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

          <div className="text-4xl font-extrabold gradient-text">{formatPrice(product.price)}</div>

          <p className="text-slate-600 leading-relaxed">{product.description}</p>

          {/* Stock */}
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
            </span>
          </div>

          {/* Brand */}
          {product.brand && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">Brand:</span>
              <span className="text-sm font-semibold text-slate-800">{product.brand}</span>
            </div>
          )}

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

      {/* ─── Reviews Section ─────────────────────────────── */}
      <div className="mt-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-title text-2xl">Customer Reviews ({product.numReviews})</h2>
          {isAuthenticated && !alreadyReviewed && !showReviewForm && (
            <Button size="sm" onClick={() => setShowReviewForm(true)}>
              Write a Review
            </Button>
          )}
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <div className="card p-6 mb-8 animate-slide-up">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Write Your Review</h3>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              {/* Star Rating */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Rating</label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition-transform hover:scale-110"
                    >
                      <HiStar
                        className={`w-8 h-8 ${
                          star <= (hoverRating || reviewRating) ? 'text-amber-400' : 'text-slate-200'
                        } transition-colors`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-slate-500 font-medium">
                    {reviewRating === 1 && 'Poor'}
                    {reviewRating === 2 && 'Fair'}
                    {reviewRating === 3 && 'Good'}
                    {reviewRating === 4 && 'Very Good'}
                    {reviewRating === 5 && 'Excellent'}
                  </span>
                </div>
              </div>

              {/* Comment */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Comment</label>
                <textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Share your experience with this product..."
                  rows={4}
                  className="input-field resize-none"
                  required
                />
              </div>

              <div className="flex gap-3">
                <Button type="submit" loading={reviewLoading} size="sm">
                  Submit Review
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowReviewForm(false);
                    setReviewComment('');
                    setReviewRating(5);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Review List */}
        {product.reviews?.length > 0 ? (
          <div className="space-y-4">
            {product.reviews.map((review, index) => (
              <div key={review._id || index} className="card p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <HiUser className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-slate-800">{review.name}</h4>
                      <span className="text-xs text-slate-400">
                        {new Date(review.createdAt).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <ProductRating rating={review.rating} small />
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 card">
            <HiStar className="w-12 h-12 text-slate-200 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">No reviews yet</p>
            <p className="text-sm text-slate-400 mt-1">Be the first to review this product</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
