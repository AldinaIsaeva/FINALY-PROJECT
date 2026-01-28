import axios from 'axios';

const BASE_URL = 'https://69771aca5b9c0aed1e855d2a.mockapi.io';
const RESOURCE = '/list';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


let priceWarningLogged = false;

const normalizePrice = (price) => {
  if (typeof price === 'number' && !isNaN(price)) {
    return price;
  }
  if (typeof price === 'string') {
    const parsed = parseFloat(price);
    if (!isNaN(parsed)) {
      return parsed;
    }
  }

  if (!priceWarningLogged) {
    // Log only once to avoid spamming the console
    console.warn('Invalid price received from API, falling back to 0:', price);
    priceWarningLogged = true;
  }

  return 0;
};


const normalizeDiscount = (discount) => {
  const num = typeof discount === 'number' ? discount : parseFloat(discount) || 0;
  if (isNaN(num) || num < 0) return 0;
  if (num > 100) return 100;
  return num;
};

export const productsApi = {
 
  getAll: async () => {
    try {
      const response = await api.get(RESOURCE);
      return response.data.map(product => ({
        ...product,
        price: normalizePrice(product.price),
        discount: normalizeDiscount(product.discount),
      }));
    } catch (error) {
      throw new Error(`Failed to fetch products: ${error.message}`);
    }
  },

 
  getProducts: async () => {
    return productsApi.getAll();
  },


  getById: async (id) => {
    try {
      const response = await api.get(`${RESOURCE}/${id}`);
      return {
        ...response.data,
        price: normalizePrice(response.data.price),
        discount: normalizeDiscount(response.data.discount),
      };
    } catch (error) {
      throw new Error(`Failed to fetch product: ${error.message}`);
    }
  },

 
  create: async (productData) => {
    try {
      const payload = {
        title: productData.title,
        image: productData.image,
        price: Number(productData.price),
        discount: Number(productData.discount) || 0,
        category: productData.category,
      };
      const response = await api.post(RESOURCE, payload);
      return {
        ...response.data,
        price: normalizePrice(response.data.price),
        discount: normalizeDiscount(response.data.discount),
      };
    } catch (error) {
      throw new Error(`Failed to create product: ${error.message}`);
    }
  },


  update: async (id, productData) => {
    try {
      const payload = {
        title: productData.title,
        image: productData.image,
        price: Number(productData.price),
        discount: Number(productData.discount) || 0,
        category: productData.category,
      };
      const response = await api.put(`${RESOURCE}/${id}`, payload);
      return {
        ...response.data,
        price: normalizePrice(response.data.price),
        discount: normalizeDiscount(response.data.discount),
      };
    } catch (error) {
      throw new Error(`Failed to update product: ${error.message}`);
    }
  },


  delete: async (id) => {
    try {
      await api.delete(`${RESOURCE}/${id}`);
      return id;
    } catch (error) {
      throw new Error(`Failed to delete product: ${error.message}`);
    }
  },
};

