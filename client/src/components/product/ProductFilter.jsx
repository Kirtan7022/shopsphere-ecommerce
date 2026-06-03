import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HiFunnel, HiXMark } from 'react-icons/hi2';
import Button from '../common/Button';

const categories = ['Electronics', 'Fashion', 'Home & Living', 'Sports', 'Books', 'Beauty'];
const sortOptions = [
  { label: 'Newest', value: '-createdAt' },
  { label: 'Price: Low to High', value: 'price' },
  { label: 'Price: High to Low', value: '-price' },
  { label: 'Most Reviewed', value: '-numReviews' },
  { label: 'Top Rated', value: '-averageRating' },
];

const ProductFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeCategory = searchParams.get('category') || '';
  const activeSort = searchParams.get('sort') || '-createdAt';

  const handleFilter = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    setSearchParams(params);
  };

  const clearAll = () => setSearchParams({});

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h4 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wider">Category</h4>
        <div className="space-y-1">
          <button
            onClick={() => handleFilter('category', '')}
            className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
              !activeCategory ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilter('category', cat)}
              className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                activeCategory === cat ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h4 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wider">Sort By</h4>
        <div className="space-y-1">
          {sortOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleFilter('sort', opt.value)}
              className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                activeSort === opt.value ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <Button variant="secondary" size="sm" onClick={clearAll} className="w-full">
        <HiXMark className="w-4 h-4" /> Clear Filters
      </Button>
    </div>
  );

  return (
    <>
      {/* Mobile filter button */}
      <button onClick={() => setMobileOpen(true)} className="lg:hidden flex items-center gap-2 btn-secondary w-full mb-4">
        <HiFunnel className="w-4 h-4" /> Filters
      </button>

      {/* Desktop filter */}
      <div className="hidden lg:block card p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
          <HiFunnel className="w-5 h-5 text-indigo-500" /> Filters
        </h3>
        <FilterContent />
      </div>

      {/* Mobile filter drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white p-6 overflow-auto animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg hover:bg-slate-100">
                <HiXMark className="w-5 h-5" />
              </button>
            </div>
            <FilterContent />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductFilter;
