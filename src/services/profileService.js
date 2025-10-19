import apiClient from '../config/api';

export default {
  updateMyAccount(data) {
    return apiClient.post('/profile/', data, {
      headers: {
      }
    });
  },

  deleteMyAccount() {
    return apiClient.delete('/profile/destroy');
  },
};
