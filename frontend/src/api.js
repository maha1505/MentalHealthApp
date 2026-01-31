import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || (import.meta.env.MODE === 'development' ? "http://localhost:5000" : "/"),
});

export default API;
