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

  createAddress(data) {
    return apiClient.post('/profile/addresses', data);
  },

  updateAddress(id, data) {
    return apiClient.put('/profile/addresses/' + id, data);
  },

  deleteAddress(id) {
    return apiClient.delete('/profile/addresses/' + id);
  },

  getAddresses() {
    return apiClient.get('/profile/addresses');
  },

  getOrders() {
    return apiClient.get('/profile/orders');
  },

  getRequests() {
    return apiClient.get('/profile/requests');
  },

  cancelOrder(id) {
    return apiClient.put('/profile/orders/' + id + '/cancel');
  },

  cancelRequest(id) {
    return apiClient.put('/profile/requests/' + id + '/cancel');
  },
};
