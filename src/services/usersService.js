import apiClient from '../config/api';

export default {
  updateUser(id, data) {
    return apiClient.put('/users/' + id, data);
  },

  deleteUser(id) {
    return apiClient.delete('/users/' + id);
  },

  getUser(id) {
    return apiClient.get('/users/' + id);
  },

  getUsers() {
    return apiClient.get('/users');
  },

  getCouriers() {
    return apiClient.get('/users/couriers');
  },
};
