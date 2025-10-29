import apiClient from '../config/api';

export default {
  forgotPassword(data) {
    return apiClient.post('/forgot-password', data);
  },

  verifyCode(data) {
    return apiClient.post('/verify-code', data);
  },

  resetPassword(data) {
    return apiClient.post('/reset-password', data);
  },
};
