import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllProducts,
  getProductById,
  getProductCategories,
  createProduct as createProductApi,
  updateProduct as updateProductApi,
  deleteProduct as deleteProductApi,
  createReview as createReviewApi,
} from '../../services/productService';

// ─── Public Thunks ─────────────────────────────────────────

export const fetchProducts = createAsyncThunk('products/fetchAll', async (params, { rejectWithValue }) => {
  try {
    const { data } = await getAllProducts(params);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
  }
});

export const fetchProductById = createAsyncThunk('products/fetchById', async (id, { rejectWithValue }) => {
  try {
    const { data } = await getProductById(id);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch product');
  }
});

export const fetchCategories = createAsyncThunk('products/fetchCategories', async (_, { rejectWithValue }) => {
  try {
    const { data } = await getProductCategories();
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch categories');
  }
});

// ─── Admin Thunks ──────────────────────────────────────────

export const createProduct = createAsyncThunk('products/create', async (productData, { rejectWithValue }) => {
  try {
    const { data } = await createProductApi(productData);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to create product');
  }
});

export const updateProduct = createAsyncThunk('products/update', async ({ id, productData }, { rejectWithValue }) => {
  try {
    const { data } = await updateProductApi(id, productData);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update product');
  }
});

export const deleteProduct = createAsyncThunk('products/delete', async (id, { rejectWithValue }) => {
  try {
    await deleteProductApi(id);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to delete product');
  }
});

// ─── Review Thunk ──────────────────────────────────────────

export const addReview = createAsyncThunk('products/addReview', async ({ id, reviewData }, { rejectWithValue }) => {
  try {
    const { data } = await createReviewApi(id, reviewData);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to add review');
  }
});

// ─── State ─────────────────────────────────────────────────

const initialState = {
  products: [],
  product: null,
  categories: [],
  loading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
  totalProducts: 0,
  filteredCount: 0,
  // Admin
  adminLoading: false,
  adminError: null,
  adminSuccess: false,
  // Reviews
  reviewLoading: false,
  reviewSuccess: false,
};

// ─── Slice ─────────────────────────────────────────────────

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    clearProductDetail: (state) => {
      state.product = null;
    },
    clearAdminStatus: (state) => {
      state.adminError = null;
      state.adminSuccess = false;
    },
    clearReviewStatus: (state) => {
      state.reviewLoading = false;
      state.reviewSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // ── Fetch Products ──
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products || [];
        state.totalPages = action.payload.totalPages || 1;
        state.totalProducts = action.payload.totalProducts || 0;
        state.filteredCount = action.payload.filteredCount || 0;
        state.currentPage = action.payload.currentPage || 1;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ── Fetch Product By ID ──
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.product || action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ── Fetch Categories ──
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload.categories || action.payload;
      })
      // ── Create Product ──
      .addCase(createProduct.pending, (state) => {
        state.adminLoading = true;
        state.adminError = null;
        state.adminSuccess = false;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.adminLoading = false;
        state.adminSuccess = true;
        state.products.unshift(action.payload.product || action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.adminLoading = false;
        state.adminError = action.payload;
      })
      // ── Update Product ──
      .addCase(updateProduct.pending, (state) => {
        state.adminLoading = true;
        state.adminError = null;
        state.adminSuccess = false;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.adminLoading = false;
        state.adminSuccess = true;
        const updated = action.payload.product || action.payload;
        const index = state.products.findIndex((p) => p._id === updated._id);
        if (index >= 0) state.products[index] = updated;
        if (state.product?._id === updated._id) state.product = updated;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.adminLoading = false;
        state.adminError = action.payload;
      })
      // ── Delete Product ──
      .addCase(deleteProduct.pending, (state) => {
        state.adminLoading = true;
        state.adminError = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.adminLoading = false;
        state.adminSuccess = true;
        state.products = state.products.filter((p) => p._id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.adminLoading = false;
        state.adminError = action.payload;
      })
      // ── Add Review ──
      .addCase(addReview.pending, (state) => {
        state.reviewLoading = true;
        state.reviewSuccess = false;
      })
      .addCase(addReview.fulfilled, (state) => {
        state.reviewLoading = false;
        state.reviewSuccess = true;
      })
      .addCase(addReview.rejected, (state, action) => {
        state.reviewLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setPage, clearProductDetail, clearAdminStatus, clearReviewStatus } = productSlice.actions;
export default productSlice.reducer;
