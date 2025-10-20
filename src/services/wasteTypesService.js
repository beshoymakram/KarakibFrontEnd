import apiClient from '../config/api';

export default {
  createType(data) {
    return apiClient.post('/waste-types', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  updateType(id, data) {
    return apiClient.put('/waste-types/' + id, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  postUpdateType(id, data) {
    return apiClient.post(`/waste-types/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },

  deleteType(id) {
    return apiClient.delete('/waste-types/' + id);
  },

  getType(id) {
    return apiClient.get('/waste-types/' + id);
  },

  getTypes() {
    return apiClient.get('/waste-types');
  },
};
