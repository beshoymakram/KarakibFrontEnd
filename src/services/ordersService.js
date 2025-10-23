import apiClient from '../config/api';

export default {
  updateOrder(id, data) {
    return apiClient.put('/orders/' + id, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  postUpdateOrder(id, data) {
    return apiClient.post(`/orders/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },

  deleteOrder(id) {
    return apiClient.delete('/orders/' + id);
  },

  getOrder(id) {
    return apiClient.get('/orders/' + id);
  },

  getOrders() {
    return apiClient.get('/orders');
  },

  cancelOrder(id) {
    return apiClient.put('/orders/' + id + '/cancel');
  },

  completeOrder(id) {
    return apiClient.put('/orders/' + id + '/complete');
  },
};
