import axiosInstance from "../axios.config";

export const ProductService = {
  getAll: () => {
    return axiosInstance.get('/product/all');
  },
};