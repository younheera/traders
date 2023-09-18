/**
 * @author wheesunglee
 * @create date 2023-09-19 08:19:20
 * @modify date 2023-09-19 08:19:20
 */
package com.newus.traders.product;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<Product> getProducts() {
        return productRepository.findAll();
    }
}
