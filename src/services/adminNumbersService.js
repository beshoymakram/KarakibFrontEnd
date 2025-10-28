import apiClient from '../config/api';

export default {
  getNumbers() {
    return apiClient.get('/numbers');
  },
};
