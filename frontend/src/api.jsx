import axios from "axios";

const API = axios.create({
  // baseURL: "http://127.0.0.1:8000/",  // TODO: change to the production URL
  baseURL: "/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Token management utility functions
const getAccessToken = () => localStorage.getItem("access");
const getRefreshToken = () => localStorage.getItem("refresh");

const setTokens = (access, refresh) => {
  localStorage.setItem("access", access);
  if (refresh) localStorage.setItem("refresh", refresh);
};

const clearTokens = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
};

// Function to refresh the access token
const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  try {
    const response = await axios.post(
      "/api/user/token/refresh/",
      {
        refresh: refreshToken,
      }
    );

    const newAccessToken = response.data.access;
    setTokens(newAccessToken, refreshToken);
    return newAccessToken;
  } catch (error) {
    // Refresh token is invalid or expired
    clearTokens();
    window.location.href = "/login";
    throw error;
  }
};

// Request interceptor to add access token to headers
API.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If we get a 401 and haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return API(originalRequest);
      } catch (refreshError) {
        // Refresh failed, user needs to login again
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Logout function
const logout = () => {
  clearTokens();
  window.location.href = "/";
};

export default API;
export {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
  refreshAccessToken,
  logout,
};
