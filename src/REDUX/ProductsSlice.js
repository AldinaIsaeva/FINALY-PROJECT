import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productsApi } from '../API/productsApi';


export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const products = await productsApi.getAll();
      return products;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const product = await productsApi.getById(id);
      return product;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createProduct = createAsyncThunk(
  'products/create',
  async (productData, { rejectWithValue }) => {
    try {
      const product = await productsApi.create(productData);
      return product;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/update',
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const product = await productsApi.update(id, productData);
      return product;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id, { rejectWithValue }) => {
    try {
      await productsApi.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  selectedProduct: null,
  loading: false,
  error: null,
  filters: {
    search: '',
    category: '',
    sortBy: 'price',
    sortOrder: 'asc',
  },
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.filters.search = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.filters.category = action.payload;
    },
    setSort: (state, action) => {
      state.filters.sortBy = action.payload.sortBy;
      state.filters.sortOrder = action.payload.sortOrder;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    clearError: (state) => {
      state.error = null;
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
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

   
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

   
    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.selectedProduct?.id === action.payload.id) {
          state.selectedProduct = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    
    builder
      .addCase(deleteProduct.pending, (state, action) => {
        
        state.items = state.items.filter(item => item.id !== action.meta.arg);
        if (state.selectedProduct?.id === action.meta.arg) {
          state.selectedProduct = null;
        }
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        
      });
  },
});

export const { setSearch, setCategoryFilter, setSort, clearSelectedProduct, clearError } = productsSlice.actions;


export const selectAllProducts = (state) => state.products.items;
export const selectProductsLoading = (state) => state.products.loading;
export const selectProductsError = (state) => state.products.error;
export const selectSelectedProduct = (state) => state.products.selectedProduct;
export const selectFilters = (state) => state.products.filters;


export const selectFilteredProducts = (state) => {
  const { items, filters } = state.products;
  let filtered = [...items];

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(product =>
      product.title.toLowerCase().includes(searchLower)
    );
  }


  if (filters.category) {
    filtered = filtered.filter(product =>
      product.category === filters.category
    );
  }

 
  filtered.sort((a, b) => {
    let aVal, bVal;
    
    if (filters.sortBy === 'price') {
      aVal = isNaN(a.price) ? -Infinity : a.price;
      bVal = isNaN(b.price) ? -Infinity : b.price;
    } else if (filters.sortBy === 'title') {
      aVal = a.title.toLowerCase();
      bVal = b.title.toLowerCase();
    } else {
      aVal = a[filters.sortBy] || '';
      bVal = b[filters.sortBy] || '';
    }

    if (filters.sortOrder === 'asc') {
      return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
    } else {
      return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
    }
  });

  return filtered;
};


export const selectCategories = (state) => {
  const categories = state.products.items
    .map(product => product.category)
    .filter(Boolean);
  return [...new Set(categories)].sort();
};

export default productsSlice.reducer;

