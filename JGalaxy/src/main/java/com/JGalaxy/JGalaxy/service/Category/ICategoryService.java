package com.JGalaxy.JGalaxy.service.Category;

import com.JGalaxy.JGalaxy.dto.CategoryDto;
import com.JGalaxy.JGalaxy.dto.Response;

public interface ICategoryService {
    Response createCategory(CategoryDto categoryDto);
    Response updateCategory(Long categoryId,CategoryDto categoryDto);
    Response getAllCategories();
    Response getCategoryById(Long categoryId);
    Response deleteCategory(Long categoryId);
}
