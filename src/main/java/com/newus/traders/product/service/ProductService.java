/**
 * @author wheesunglee
 * @create date 2023-09-19 08:19:20
 * @modify date 2023-09-23 18:36:28
 */
package com.newus.traders.product.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.newus.traders.exception.CustomException;
import com.newus.traders.exception.ErrorCode;
import com.newus.traders.product.dto.ProductDto;
import com.newus.traders.product.entity.Product;
import com.newus.traders.product.repository.ProductRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<ProductDto> getAllProducts() {
        List<Product> productList = productRepository.findAll();

        List<ProductDto> productDtoList = new ArrayList<>();

        for (Product product : productList) {
            productDtoList.add(ProductDto.from(product));
        }

        return productDtoList;
    }

    public ProductDto getProduct(int productId) {
        Optional<Product> optionalProduct = productRepository.findById(productId);

        if (!optionalProduct.isPresent()) {
            // 존재하지 않는 상품을 찾을 경우의 예외처리
            throw new CustomException(ErrorCode.PRODUCT_NOT_FOUND);
        }

        Product product = optionalProduct.get();

        return ProductDto.from(product);
    }
}
