import apiClient from '../config/api';

export default {
  updateOrder(id, data) {
    return apiClient.put('/donations/' + id, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  postUpdateOrder(id, data) {
    return apiClient.post(`/donations/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },

  deleteOrder(id) {
    return apiClient.delete('/donations/' + id);
  },

  getOrder(id) {
    return apiClient.get('/donations/' + id);
  },

  getDonations() {
    return apiClient.get('/donations');
  },

  cancelOrder(id) {
    return apiClient.put('/donations/' + id + '/cancel');
  },

  completeOrder(id) {
    return apiClient.put('/donations/' + id + '/complete');
  },
};
