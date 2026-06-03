import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts } from '../redux/slices/productSlice';
import ProductCard from '../components/product/ProductCard';
import ProductFilter from '../components/product/ProductFilter';
import Pagination from '../components/common/Pagination';
import { PageLoader } from '../components/common/Loader';
import { HiCube, HiMagnifyingGlass, HiXMark } from 'react-icons/hi2';

const Products = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, loading, totalProducts, filteredCount, totalPages, currentPage } = useSelector((state) => state.products);
  const [searchInput, setSearchInput] = useState(searchParams.get('keyword') || '');

  useEffect(() => {
    const params = Object.fromEntries(searchParams);
    dispatch(fetchProducts(params));
  }, [dispatch, searchParams]);

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      const params = new URLSearchParams(searchParams);
      if (searchInput.trim()) {
        params.set('keyword', searchInput.trim());
      } else {
        params.delete('keyword');
      }
      params.delete('page');
      setSearchParams(params);
    },
    [searchInput, searchParams, setSearchParams]
  );

  const clearSearch = () => {
    setSearchInput('');
    const params = new URLSearchParams(searchParams);
    params.delete('keyword');
    params.delete('page');
    setSearchParams(params);
  };

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeKeyword = searchParams.get('keyword');

  return (
    <div className="page-container py-8 pb-24 md:pb-8">
      {/* Page Header + Search */}
      <div className="mb-8">
        <h1 className="section-title">All Products</h1>
        <p className="section-subtitle mt-2">
          {filteredCount > 0
            ? `Showing ${products.length} of ${filteredCount} products`
            : totalProducts > 0
            ? 'No products match your filters'
            : 'Browse our collection'}
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mt-6 max-w-xl">
          <div className="relative">
            <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search products by name..."
              className="input-field !pl-12 !pr-24"
              id="product-search"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {(searchInput || activeKeyword) && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <HiXMark className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                className="px-4 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md shadow-indigo-500/20"
              >
                Search
              </button>
            </div>
          </div>
        </form>

        {/* Active keyword indicator */}
        {activeKeyword && (
          <div className="mt-3 flex items-center gap-2">
            <span className="text-sm text-slate-500">Results for</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-lg">
              "{activeKeyword}"
              <button onClick={clearSearch} className="hover:text-indigo-900">
                <HiXMark className="w-3.5 h-3.5" />
              </button>
            </span>
          </div>
        )}
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
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
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
