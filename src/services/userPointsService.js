import apiClient from '../config/api';

export default {
  convertPoints(data) {
    return apiClient.post('/profile/points/convert', data);
  },

  donatePoints(data) {
    return apiClient.post('/profile/points/donate', data);
  },

  updateAddress(id, data) {
    return apiClient.put('/profile/addresses' + id, data);
  },

  getPoints() {
    return apiClient.get('/profile/points');
  },
};
