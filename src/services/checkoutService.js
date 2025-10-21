import apiClient from '../config/api';

export default {
  checkout(data) {
    return apiClient.post('/checkout', data);
  },
};
