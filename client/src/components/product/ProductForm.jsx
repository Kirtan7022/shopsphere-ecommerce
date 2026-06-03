import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, updateProduct, clearAdminStatus } from '../../redux/slices/productSlice';
import Input from '../common/Input';
import Button from '../common/Button';
import toast from 'react-hot-toast';
import { HiPhoto, HiXMark, HiPlus } from 'react-icons/hi2';

const categories = ['Electronics', 'Fashion', 'Home & Living', 'Sports', 'Books', 'Beauty'];

const ProductForm = ({ product = null, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { adminLoading, adminError, adminSuccess } = useSelector((state) => state.products);
  const isEditing = !!product;

  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '',
    category: product?.category || '',
    brand: product?.brand || '',
    stock: product?.stock || '',
    featured: product?.featured || false,
  });
  const [imageUrls, setImageUrls] = useState(
    product?.images?.map((img) => img.url) || ['']
  );

  useEffect(() => {
    if (adminSuccess) {
      toast.success(isEditing ? 'Product updated!' : 'Product created!');
      dispatch(clearAdminStatus());
      if (onClose) onClose();
      else navigate('/admin/products');
    }
  }, [adminSuccess, dispatch, isEditing, navigate, onClose]);

  useEffect(() => {
    if (adminError) {
      toast.error(adminError);
      dispatch(clearAdminStatus());
    }
  }, [adminError, dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageUrlChange = (index, value) => {
    const updated = [...imageUrls];
    updated[index] = value;
    setImageUrls(updated);
  };

  const addImageUrl = () => setImageUrls([...imageUrls, '']);
  const removeImageUrl = (index) => {
    if (imageUrls.length <= 1) return;
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const images = imageUrls
      .filter((url) => url.trim())
      .map((url) => ({ url: url.trim(), alt: formData.name }));

    const productData = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
      images,
    };

    if (isEditing) {
      dispatch(updateProduct({ id: product._id, productData }));
    } else {
      dispatch(createProduct(productData));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <Input
            label="Product Name"
            name="name"
            placeholder="e.g. Premium Wireless Headphones"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your product in detail..."
            rows={4}
            className="input-field resize-none"
            required
          />
        </div>

        <Input
          label="Price (₹)"
          name="price"
          type="number"
          min="0"
          step="0.01"
          placeholder="999"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <Input
          label="Stock Quantity"
          name="stock"
          type="number"
          min="0"
          placeholder="50"
          value={formData.stock}
          onChange={handleChange}
          required
        />

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="input-field"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <Input
          label="Brand"
          name="brand"
          placeholder="e.g. Apple, Samsung"
          value={formData.brand}
          onChange={handleChange}
        />
      </div>

      {/* Image URLs */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          <HiPhoto className="w-4 h-4 inline mr-1" /> Product Images (URLs)
        </label>
        <div className="space-y-2">
          {imageUrls.map((url, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="url"
                value={url}
                onChange={(e) => handleImageUrlChange(index, e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="input-field"
              />
              {imageUrls.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImageUrl(index)}
                  className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                >
                  <HiXMark className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
          {imageUrls.length < 5 && (
            <button
              type="button"
              onClick={addImageUrl}
              className="flex items-center gap-1 text-sm text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
            >
              <HiPlus className="w-4 h-4" /> Add another image
            </button>
          )}
        </div>
      </div>

      {/* Featured */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          name="featured"
          checked={formData.featured}
          onChange={handleChange}
          className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
        />
        <span className="text-sm font-medium text-slate-700">Mark as Featured Product</span>
      </label>

      {/* Submit */}
      <div className="flex gap-3 pt-2">
        <Button type="submit" loading={adminLoading} className="flex-1">
          {isEditing ? 'Update Product' : 'Create Product'}
        </Button>
        {onClose && (
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default ProductForm;
