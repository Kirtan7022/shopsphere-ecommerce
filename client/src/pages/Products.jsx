import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts } from '../redux/slices/productSlice';
import ProductCard from '../components/product/ProductCard';
import ProductFilter from '../components/product/ProductFilter';
import { PageLoader } from '../components/common/Loader';
import { HiCube } from 'react-icons/hi2';

const Products = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { products, loading, totalProducts } = useSelector((state) => state.products);

  useEffect(() => {
    const params = Object.fromEntries(searchParams);
    dispatch(fetchProducts(params));
  }, [dispatch, searchParams]);

  return (
    <div className="page-container py-8 pb-24 md:pb-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="section-title">All Products</h1>
        <p className="section-subtitle mt-2">
          {totalProducts > 0 ? `Showing ${products.length} of ${totalProducts} products` : 'Browse our collection'}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filter */}
        <aside className="lg:w-72 flex-shrink-0">
          <ProductFilter />
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {loading ? (
            <PageLoader />
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <HiCube className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-600 mb-2">No products found</h3>
              <p className="text-slate-400">Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
