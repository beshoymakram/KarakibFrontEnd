import apiClient from '../config/api';

export default {
  withdrawBalance(data) {
    return apiClient.post('/profile/balance/withdraw', data);
  },

  getBalance() {
    return apiClient.get('/profile/balance');
  },
};
