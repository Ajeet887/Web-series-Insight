import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Series API
export const seriesAPI = {
  // Get trending series from TMDB
  getTrending: () => api.get('/series/trending'),
  
  // Get series details with AI insights
  getDetails: (id) => api.get(`/series/${id}/details`),
  
  // Get recommendations for a series
  getRecommendations: (id) => api.get(`/series/${id}/recommendations`),
  
  // Search series
  search: (query) => api.get(`/series/search/${query}`),
  
  // Legacy endpoints
  getAll: () => api.get('/series'),
  getById: (id) => api.get(`/series/local/${id}`),
  addReview: (id, review) => api.post(`/series/${id}/reviews`, review)
}

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/me')
}

export default api