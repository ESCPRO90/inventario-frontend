import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const axiosInstance = axios.create({
  baseURL: API_URL,
})

// Interceptor para incluir token en cada request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') // o sessionStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default axiosInstance
