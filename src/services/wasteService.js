import apiClient from '../config/api';

export default {
  createType(data) {
    return apiClient.post('/waste-types', data);
  },

  updateType(id, data) {
    return apiClient.post('/waste-types/' + id, data);
  },

  deleteType(id) {
    return apiClient.post('/login/' + id);
  },

  getType(id) {
    return apiClient.get('/waste-types/' + id);
  },
};
