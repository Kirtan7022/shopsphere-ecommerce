import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllProducts, getProductById, getProductCategories } from '../../services/productService';

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

const initialState = {
  products: [],
  product: null,
  categories: [],
  loading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
  totalProducts: 0,
  filters: {
    category: '',
    priceRange: [0, 100000],
    rating: 0,
    sort: '-createdAt',
    keyword: '',
  },
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    clearProductDetail: (state) => {
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products || [];
        state.totalPages = action.payload.totalPages || 1;
        state.totalProducts = action.payload.totalProducts || 0;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export const { setFilters, clearFilters, setPage, clearProductDetail } = productSlice.actions;
export default productSlice.reducer;
