import apiClient from '../config/api';

export default {
  updateMyAccount() {
    return apiClient.put('/profile/');
  },

  deleteMyAccount() {
    return apiClient.delete('/profile/destroy');
  },
};
