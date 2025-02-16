import axios from "axios";

const API_BASE_URL = "https://menu-managment-system-8a9y.onrender.com/api"; // Change if needed

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
