import axiosInstance from "../axios.config";

export class UserService{
  getMyInfo() {
    return axiosInstance.get('/user/myInfo');
  }
};