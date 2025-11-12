import apiClient from '../config/api';

export default {
  register(userData) {
    return apiClient.post('/register', userData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  login(userData) {
    return apiClient.post('/login', userData);
  },

  logout() {
    return apiClient.post('/logout');
  },

  getUser() {
    return apiClient.get('/user');
  },

  saveAuthData(token, user) {
    localStorage.setItem('auth-token', token);
    localStorage.setItem('user', JSON.stringify(user));
  },

  getAuthData() {
    const token = localStorage.getItem('auth-token');
    const user = JSON.parse(localStorage.getItem('user'));
    return { token, user };
  },

  clearAuthData() {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user');
  },

  isAuthenticated() {
    return !!localStorage.getItem('auth-token');
  },
};
