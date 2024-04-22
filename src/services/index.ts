import axios, { AxiosInstance } from "axios";
const BASE_URL = "http://localhost:3000";

export const apiRequest: AxiosInstance = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true,
  // timeout: 30000,
});

apiRequest.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === "401") {
      // error handling code
    }
    console.log("error is", error);
    return Promise.reject(error);
  }
);