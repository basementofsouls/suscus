import axios from "axios";

export const API_URL =
  import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:3000";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    "access_token"
  )}`;
  return config;
});

export default $api;
