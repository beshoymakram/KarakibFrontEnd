import apiClient from '../config/api';

export default {
  updateRequest(id, data) {
    return apiClient.put('/requests/' + id, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  postUpdateRequest(id, data) {
    return apiClient.post(`/requests/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },

  deleteRequest(id) {
    return apiClient.delete('/requests/' + id);
  },

  getRequest(id) {
    return apiClient.get('/requests/' + id);
  },

  getRequests() {
    return apiClient.get('/requests');
  },

  getMyRequests() {
    return apiClient.get('/assigned-requests');
  },

  cancelRequest(id) {
    return apiClient.put('/requests/' + id + '/cancel');
  },

  completeRequest(id) {
    return apiClient.put('/requests/' + id + '/complete');
  },

  assignRequest(id, courier_id) {
    return apiClient.post(`/requests/${id}/assign/${courier_id}`);
  },

  unassign(id) {
    return apiClient.post(`/requests/${id}/unassign`);
  },
};
