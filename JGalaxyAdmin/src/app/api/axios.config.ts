import axios from 'axios';
import queryString from 'query-string'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:9193',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
  timeout: 60 * 1000,
});

// Interceptor trước khi gửi request (ví dụ: thêm token)
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token'); 
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }else {
            console.warn("⚠️ Không tìm thấy access token!");
          }
        return config;
    },
    (error) => Promise.reject(error)
);


// Interceptor khi nhận response (xử lý lỗi API)
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response || error.message);
        return Promise.reject(error);
    }
);

export default axiosInstance;