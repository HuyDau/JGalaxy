package com.JGalaxy.JGalaxy.service.Product;

import com.JGalaxy.JGalaxy.dto.ProductDto;
import com.JGalaxy.JGalaxy.dto.Response;
import com.JGalaxy.JGalaxy.entity.Category;
import com.JGalaxy.JGalaxy.entity.Product;
import com.JGalaxy.JGalaxy.exception.NotFoundException;
import com.JGalaxy.JGalaxy.mapper.EntityDtoMapper;
import com.JGalaxy.JGalaxy.reponsitory.CategoryRepo;
import com.JGalaxy.JGalaxy.reponsitory.ProductRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService implements IProductService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    private final ProductRepo productRepo;
    private final CategoryRepo categoryRepo;
    private final EntityDtoMapper entityDtoMapper;

    @Override
    public Response createProduct(Long categoryId, MultipartFile image, String name, String description, BigDecimal price) {
        try{
            Product product = new Product();
            Category category = categoryRepo.findById(categoryId).orElseThrow(()-> new NotFoundException("Category not found"));
            product.setCategory(category);
            product.setName(name);
            product.setDescription(description);
            product.setPrice(price);
            if(image != null && !image.isEmpty()) {
                Path uploadPath = Paths.get(uploadDir);
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath); // Tạo thư mục nếu chưa tồn tại
                }

                String fileName = UUID.randomUUID().toString() + "_" + image.getOriginalFilename();
                Path filePath = uploadPath.resolve(fileName);

                Files.copy(image.getInputStream(), filePath);
                product.setImageUrl("/uploads/" + fileName);
            }
            productRepo.save(product);
            return Response.builder()
                    .status(200)
                    .message("Product created successfully")
                    .build();
        }catch (Exception e){
            return Response.builder()
                    .status(500)
                    .message("Error creating product: " + e.getMessage())
                    .build();
        }
    }

    @Override
    public Response updateProduct(Long productId, Long categoryId, MultipartFile image, String name, String description, BigDecimal price) {
        try{
            Product product = productRepo.findById(productId).orElseThrow(()-> new NotFoundException("Product not found"));
            Category category = categoryRepo.findById(categoryId).orElseThrow(()-> new NotFoundException("Category not found"));;

            if (category != null) product.setCategory(category);
            if (name != null) product.setName(name);
            if (price != null) product.setPrice(price);
            if (description != null) product.setDescription(description);

            if (image != null && !image.isEmpty()) {
                Path uploadPath = Paths.get(uploadDir);
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }
                if (product.getImageUrl() != null) {
                    Path oldFilePath = Paths.get(uploadDir).resolve(product.getImageUrl().substring(9)); // Bỏ "/uploads/"
                    Files.deleteIfExists(oldFilePath);
                }

                String fileName = UUID.randomUUID().toString() + "_" + image.getOriginalFilename();
                Path filePath = uploadPath.resolve(fileName);
                Files.copy(image.getInputStream(), filePath);
                product.setImageUrl("/uploads/" + fileName);
            }
            productRepo.save(product);
            return Response.builder()
                    .status(200)
                    .message("Product updated successfully")
                    .build();
        }catch (Exception e){
            return Response.builder()
                    .status(500)
                    .message("Error update product: " + e.getMessage())
                    .build();
        }
    }

    @Override
    public Response deleteProduct(Long productId) {
        Product product = productRepo.findById(productId).orElseThrow(()-> new NotFoundException("Product not found"));
        productRepo.delete(product);
        return Response.builder()
                .status(200)
                .message("Product deleted successfully")
                .build();
    }

    @Override
    public Response getAllProducts() {
        List<ProductDto> productDtoList = productRepo.findAll(Sort.by(Sort.Direction.DESC, "id"))
                .stream()
                .map(entityDtoMapper::mapProductToDtoBasic)
                .collect(Collectors.toList());
        return Response.builder()
                .status(200)
                .productList(productDtoList)
                .build();
    }

    @Override
    public Response getProductById(Long productId) {
        Product product = productRepo.findById(productId).orElseThrow(()-> new NotFoundException("Product not found"));
        ProductDto productDto = entityDtoMapper.mapProductToDtoBasic(product);
        return Response.builder()
                .status(200)
                .product(productDto)
                .build();
    }

    @Override
    public Response getProductByCategory(Long categoryId) {
        List<Product> products = productRepo.findByCategoryId(categoryId);
        if(products.isEmpty()){
            throw new NotFoundException("No Products found for this category");
        }
        List<ProductDto> productDtoList = products.stream().map(entityDtoMapper::mapProductToDtoBasic).collect(Collectors.toList());
        return Response.builder()
                .status(200)
                .productList(productDtoList)
                .build();
    }

    @Override
    public Response searchProduct(String searchValue) {
        List<Product> products = productRepo.findByNameContainingOrDescriptionContaining(searchValue, searchValue);
        if(products.isEmpty()){
            throw new NotFoundException("No Products found");
        }
        List<ProductDto> productDtoList = products.stream().map(entityDtoMapper::mapProductToDtoBasic).collect(Collectors.toList());
        return Response.builder().status(200).productList(productDtoList).build();
    }
}
