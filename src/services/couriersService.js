import apiClient from '../config/api';

export default {
  registerCourier(data) {
    return apiClient.post('/registerCourier', data);
  },

  getNumbers() {
    return apiClient.get('/courier/numbers');
  },
};
