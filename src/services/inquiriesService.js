import apiClient from '../config/api';

export default {
  createInquiry(data) {
    return apiClient.post('/inquiries', data);
  },

  updateInquiry(id, data) {
    return apiClient.put('/inquiries' + id, data);
  },

  getInquiries() {
    return apiClient.get('/inquiries');
  },

  deleteInquiry(id) {
    return apiClient.delete('/inquiries/' + id);
  },
};
