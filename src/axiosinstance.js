import axios from "axios";
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

const axiosInstance = axios.create({
  baseURL: "https://sysvonbackend-production.up.railway.app/api/v1",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    // Skip redirect if it's the logout endpoint
    const isLogoutRequest = originalRequest.url?.includes("/users/logout");

    if (
      err.response?.status === 401 &&
      !originalRequest._retry &&
      !isLogoutRequest // don't retry or redirect on logout failure
    ) {
      originalRequest._retry = true;

      try {
        await axios.post(
          "https://sysvonbackend-production.up.railway.app/api/v1/users/refreshAccessToken",
          {},
          { withCredentials: true }
        );

        return axiosInstance(originalRequest);
      } catch (refreshErr) {
        navigate("/login");
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(err);
  }
);

export default axiosInstance;
