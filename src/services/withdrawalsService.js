import apiClient from '../config/api';

export default {
  completeWithdraw(id, data) {
    return apiClient.post('/withdrawals/' + id + '/complete', data);
  },

  refundWithdraw(id, data) {
    return apiClient.post('/withdrawals/' + id + '/refund', data);
  },

  getWithdrawals() {
    return apiClient.get('/withdrawals');
  },
};
