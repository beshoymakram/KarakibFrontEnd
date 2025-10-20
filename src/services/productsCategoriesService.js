import apiClient from '../config/api';

export default {
  createCategory(data) {
    return apiClient.post('/products-categories', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  updateCategory(id, data) {
    return apiClient.put('/products-categories/' + id, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  postUpdateCategory(id, data) {
    return apiClient.post(`/products-categories/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },

  deleteCategory(id) {
    return apiClient.delete('/products-categories/' + id);
  },

  getCategory(id) {
    return apiClient.get('/products-categories/' + id);
  },

  getCategories() {
    return apiClient.get('/products-categories');
  },
};
