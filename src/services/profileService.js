import apiClient from '../config/api';

export default {
  updateMyAccount(data) {
    return apiClient.post('/profile', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  deleteMyAccount() {
    return apiClient.delete('/profile/destroy');
  },
};
