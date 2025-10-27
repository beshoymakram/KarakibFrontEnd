import apiClient from '../config/api';

export default {
  checkout(data) {
    return apiClient.post('/checkout', data);
  },

  collect(data) {
    return apiClient.post('/collect', data);
  },
};
