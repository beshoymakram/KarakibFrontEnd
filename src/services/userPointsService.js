import apiClient from '../config/api';

export default {
  createAddress(data) {
    return apiClient.post('/profile/addresses', data);
  },

  updateAddress(id, data) {
    return apiClient.put('/profile/addresses' + id, data);
  },

  getPoints() {
    return apiClient.get('/profile/points');
  },
};
