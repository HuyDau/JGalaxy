import { Injectable } from "@angular/core";
import axiosInstance from "../axios.config";
import { CreateCategoryModel } from "./categoryModel";

export class CategoriesService {
  getAll() {
    return axiosInstance.get('/category/all');
  }

  create(data: CreateCategoryModel) {
    return axiosInstance.post('/category/add', data);
  }

  delete(id: string) {
    return axiosInstance.delete(`/category/delete/${id}`);
  }

  getById(id: string) {
    return axiosInstance.get(`/category/getById/${id}`);
  }

  update(id: string, data: CreateCategoryModel) {
    return axiosInstance.put(`/category/update/${id}`, data);
  }
};