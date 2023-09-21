/**
 * @author wheesunglee
 * @create date 2023-09-19 08:19:20
 * @modify date 2023-09-20 17:42:00
 */
package com.newus.traders.product;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

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
            // 예외처리 고민
            return null;
        }

        Product product = optionalProduct.get();

        return ProductDto.from(product);
    }
}
