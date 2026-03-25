import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth Services
export const authService = {
  register: (userData) => {
    console.log('Calling register API with:', userData);
    return api.post('/auth/register', userData);
  },
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.put(`/auth/reset-password/${token}`, { password }),
};

// Car Services
export const carService = {
  getAll: (params) => api.get('/cars', { params }),
  getFeatured: () => api.get('/cars/featured'),
  getById: (id) => api.get(`/cars/${id}`),
  search: (searchParams) => api.post('/cars/search', searchParams),
  create: (carData) => api.post('/cars', carData),
  update: (id, carData) => api.put(`/cars/${id}`, carData),
  delete: (id) => api.delete(`/cars/${id}`),
  getMyCars: () => api.get('/cars/vendor/my-cars'),
};

// Booking Services
export const bookingService = {
  create: (bookingData) => api.post('/bookings', bookingData),
  getMyBookings: () => api.get('/bookings/my-bookings'),
  getVendorBookings: () => api.get('/bookings/vendor-bookings'),
  getById: (id) => api.get(`/bookings/${id}`),
  updateStatus: (id, status) => api.put(`/bookings/${id}/status`, { status }),
  cancel: (id, reason) => api.put(`/bookings/${id}/cancel`, { reason }),
  getStats: () => api.get('/bookings/stats'),
};

// User Services
export const userService = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData) => api.put('/users/profile', userData),
  changePassword: (passwords) => api.put('/users/change-password', passwords),
  uploadProfileImage: (formData) => api.post('/users/upload-profile-image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  getVendorProfile: () => api.get('/users/vendor/profile'),
  updateVendorProfile: (vendorData) => api.put('/users/vendor/profile', vendorData),
  deleteAccount: () => api.delete('/users/account'),
};

// Payment Services
export const paymentService = {
  initializeCard: (data) => api.post('/payments/card', data),
  initializeMobileMoney: (data) => api.post('/payments/mobile-money', data),
  verify: (reference) => api.get(`/payments/verify/${reference}`),
  getHistory: () => api.get('/payments/history'),
  getEarnings: () => api.get('/payments/earnings'),
  getMethods: () => api.get('/payments/methods'),
};

// Review Services
export const reviewService = {
  create: (reviewData) => api.post('/reviews', reviewData),
  getCarReviews: (carId, params) => api.get(`/reviews/car/${carId}`, { params }),
  getMyReviews: () => api.get('/reviews/my-reviews'),
  update: (id, reviewData) => api.put(`/reviews/${id}`, reviewData),
  delete: (id) => api.delete(`/reviews/${id}`),
  markHelpful: (id) => api.put(`/reviews/${id}/helpful`),
  respond: (id, response) => api.post(`/reviews/${id}/respond`, { response }),
};

// Favorite Services
export const favoriteService = {
  add: (carId) => api.post('/favorites', { carId }),
  remove: (carId) => api.delete(`/favorites/${carId}`),
  getAll: () => api.get('/favorites'),
  check: (carId) => api.get(`/favorites/check/${carId}`),
};

// Dashboard Services
export const dashboardService = {
  getUserStats: () => api.get('/dashboard/user'),
  getVendorStats: () => api.get('/dashboard/vendor'),
  getEarningsChart: () => api.get('/dashboard/vendor/earnings-chart'),
};

export default api;