import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api", // This will be proxied by Vite
});

export default axiosInstance;