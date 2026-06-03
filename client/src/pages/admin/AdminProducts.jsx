import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts, deleteProduct, clearAdminStatus } from '../../redux/slices/productSlice';
import ProductForm from '../../components/product/ProductForm';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import Pagination from '../../components/common/Pagination';
import { PageLoader } from '../../components/common/Loader';
import { formatPrice } from '../../utils/helpers';
import toast from 'react-hot-toast';
import {
  HiPlus, HiPencilSquare, HiTrash, HiMagnifyingGlass,
  HiCube, HiEye,
} from 'react-icons/hi2';

const AdminProducts = () => {
  const dispatch = useDispatch();
  const { products, loading, totalPages, currentPage, totalProducts, adminSuccess } = useSelector((state) => state.products);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const params = { page, limit: 10 };
    if (search.trim()) params.keyword = search.trim();
    dispatch(fetchProducts(params));
  }, [dispatch, page, search, adminSuccess]);

  const handleDelete = () => {
    if (deleteId) {
      dispatch(deleteProduct(deleteId));
      setDeleteId(null);
      toast.success('Product deleted!');
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditProduct(null);
    dispatch(clearAdminStatus());
  };

  return (
    <div className="page-container py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="section-title text-2xl">Manage Products</h1>
          <p className="text-sm text-slate-500 mt-1">{totalProducts} total products</p>
        </div>
        <Button onClick={() => { setEditProduct(null); setShowForm(true); }} size="sm">
          <HiPlus className="w-4 h-4" /> Add Product
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md mb-6">
        <HiMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search products..."
          className="input-field !pl-10 !py-2.5 !text-sm"
        />
      </div>

      {/* Table */}
      {loading ? (
        <PageLoader />
      ) : products.length > 0 ? (
        <>
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Product</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Price</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Stock</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Rating</th>
                    <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {products.map((product) => (
                    <tr key={product._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0">
                            {product.images?.[0]?.url ? (
                              <img src={product.images[0].url} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <HiCube className="w-5 h-5 text-slate-300" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-800 line-clamp-1">{product.name}</p>
                            {product.brand && <p className="text-xs text-slate-400">{product.brand}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="badge">{product.category}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-sm font-semibold text-slate-800">{formatPrice(product.price)}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${
                          product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-amber-600' : 'text-red-600'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            product.stock > 10 ? 'bg-green-500' : product.stock > 0 ? 'bg-amber-500' : 'bg-red-500'
                          }`} />
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-sm text-slate-600">{product.averageRating?.toFixed(1) || '0.0'} ({product.numReviews})</span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            to={`/product/${product._id}`}
                            className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                          >
                            <HiEye className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleEdit(product)}
                            className="p-2 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                          >
                            <HiPencilSquare className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteId(product._id)}
                            className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <HiTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} />
        </>
      ) : (
        <div className="text-center py-20 card">
          <HiCube className="w-16 h-16 text-slate-200 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-600 mb-2">No products found</h3>
          <p className="text-slate-400 text-sm mb-6">Start by adding your first product</p>
          <Button size="sm" onClick={() => setShowForm(true)}>
            <HiPlus className="w-4 h-4" /> Add Product
          </Button>
        </div>
      )}

      {/* Create / Edit Modal */}
      <Modal
        isOpen={showForm}
        onClose={handleCloseForm}
        title={editProduct ? 'Edit Product' : 'Create New Product'}
        size="xl"
      >
        <ProductForm product={editProduct} onClose={handleCloseForm} />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Product" size="sm">
        <p className="text-sm text-slate-600 mb-6">
          Are you sure you want to delete this product? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <Button variant="danger" onClick={handleDelete} className="flex-1">
            <HiTrash className="w-4 h-4" /> Delete
          </Button>
          <Button variant="secondary" onClick={() => setDeleteId(null)} className="flex-1">
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminProducts;
