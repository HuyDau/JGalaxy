import axiosInstance from "../axios.config";
import { AuthLoginModel } from "./authModel";

export const AuthService = {
  login: (params: AuthLoginModel) => {
    return axiosInstance.post('/auth/login', params);
  },
};