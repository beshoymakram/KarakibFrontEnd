import apiClient from '../config/api';

export default {
  registerCourier(data) {
    return apiClient.post('/registerCourier', data);
  },
};
