/**
 * @author wheesunglee
 * @create date 2023-09-19 08:18:21
 * @modify date 2023-09-19 08:18:21
 */
package com.newus.traders.product;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/product")
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public String showAllProducts() {
        List<Product> productList = productService.getProducts();

        return "productList_springboot";
    }

}