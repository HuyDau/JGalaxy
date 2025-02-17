package com.JGalaxy.JGalaxy.service.Product;

import com.JGalaxy.JGalaxy.dto.Response;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

public interface IProductService {
    Response createProduct(Long categoryId, MultipartFile image, String name, String description, BigDecimal price);
    Response updateProduct(Long productId, Long categoryId, MultipartFile image, String name, String description, BigDecimal price);
    Response deleteProduct(Long productId);
    Response getAllProducts();
    Response getProductById(Long productId);
    Response getProductByCategory(Long categoryId);
    Response searchProduct(String searchValue);
}
