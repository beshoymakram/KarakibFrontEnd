import apiClient from '../config/api';

export default {
  donate(data) {
    return apiClient.post('/donate', data);
  },
};
