import apiClient from '../config/api';

export default {
  createProduct(data) {
    return apiClient.post('/products', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  updateProduct(id, data) {
    return apiClient.put('/products/' + id, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  postUpdateProduct(id, data) {
    return apiClient.post(`/products/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },

  deleteProduct(id) {
    return apiClient.delete('/products/' + id);
  },

  getProduct(id) {
    return apiClient.get('/products/' + id);
  },

  getProducts() {
    return apiClient.get('/products');
  },
};
