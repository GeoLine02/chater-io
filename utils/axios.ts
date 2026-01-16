import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // send cookies automatically
});

// Flag to prevent multiple refresh requests at the same time
let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reject: (error: any) => void;
}[] = [];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response, // pass successful responses
  async (error: AxiosError) => {
    const originalRequest = error.config;

    // Only try to refresh if we got 401 and request has not already retried
    if (
      originalRequest &&
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        // queue all requests while refresh is in progress
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Call your refresh endpoint
        console.log("reaches", process.env.NEXT_PUBLIC_API_URL);
        const res = await api.get("/auth/refresh");
        console.log("res", res);
        const { accessToken } = res.data;

        // Optionally: store access token in memory or state
        // Retry the original request
        processQueue(null, accessToken);

        // Set the Authorization header if needed
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
