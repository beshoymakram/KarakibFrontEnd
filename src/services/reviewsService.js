import apiClient from '../config/api';

export default {
  canReview(productId) {
    return apiClient.get(`/products/${productId}/can-review`);
  },

  getReviews(productId) {
    return apiClient.get(`/products/${productId}/reviews`);
  },

  submitReview(data) {
    return apiClient.post('/reviews', data);
  },

  updateReview(reviewId, data) {
    return apiClient.put(`/reviews/${reviewId}`, data);
  },

  deleteReview(reviewId) {
    return apiClient.delete(`/reviews/${reviewId}`);
  }
};
