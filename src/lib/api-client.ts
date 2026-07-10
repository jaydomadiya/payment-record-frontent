import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "https://payment-record-backend.onrender.com"
const AUTH_TOKEN_STORAGE_KEY = "authToken"

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "*/*",
  },
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY) ?? sessionStorage.getItem(AUTH_TOKEN_STORAGE_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
