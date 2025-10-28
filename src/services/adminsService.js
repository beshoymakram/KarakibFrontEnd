import apiClient from '../config/api';

export default {
  registerAdmin(data) {
    return apiClient.post('/registerAdmin', data);
  },
};
