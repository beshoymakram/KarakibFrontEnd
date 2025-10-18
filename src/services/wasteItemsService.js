import apiClient from '../config/api';

export default {
  createItem(data) {
    return apiClient.post('/waste-items/', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  updateItem(id, data) {
    return apiClient.put('/waste-items/' + id, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  postUpdateItem(id, data) {
    return apiClient.post(`/waste-items/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },

  deleteItem(id) {
    return apiClient.delete('/waste-items/' + id);
  },

  getItem(id) {
    return apiClient.get('/waste-items/' + id);
  },

  getItems() {
    return apiClient.get('/waste-items');
  },
};
