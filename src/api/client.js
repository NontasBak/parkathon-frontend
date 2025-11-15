import axios from "axios";

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: process.env.API_BASE_URL || "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds
});

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle specific error cases
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      switch (status) {
        case 400:
          console.error("Bad Request:", data.message || "Invalid request");
          break;
        case 404:
          console.error("Not found:", data.message || "Resource not found");
          break;
        case 500:
          console.error("Server error:", data.message || "Internal server error");
          break;
        default:
          console.error("API Error:", data.message || "An error occurred");
      }
    } else if (error.request) {
      // Request made but no response received
      console.error("Network error: No response from server");
    } else {
      // Error setting up the request
      console.error("Request error:", error.message);
    }

    return Promise.reject(error);
  },
);

export default apiClient;
