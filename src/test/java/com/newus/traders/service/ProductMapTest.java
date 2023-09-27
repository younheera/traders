/**
 * @author jeongyearim
 * @create date 2023-09-26 17:30:47
 * @modify date 2023-09-26 17:30:47
 * @desc [3km 반경의 근처 상품들을 랜덤으로 db에 넣는다.]
 */
package com.newus.traders.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.newus.traders.product.entity.Product;
import com.newus.traders.product.repository.ProductRepository;
import com.newus.traders.product.service.ProductService;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class ProductMapTest {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductService productService; // ProductService 주입

    @Test
    @Transactional
    public void testGenerateRandomProductsAndSaveToDatabase() {
        double centerLatitude = 37.4989366; // 예시 위도
        double centerLongitude = -122.4194; // 예시 경도
        double radiusInKm = 3.0; // 3km 반경
        int count = 10; // 10개 생성

        List<Product> randomProducts = productService.generateRandomProducts(centerLatitude, centerLongitude, radiusInKm, count);

        for (Product product : randomProducts) {
            
            productRepository.save(product);
        }

        // 데이터베이스에서 저장된 상품 개수 확인
        List<Product> savedProducts = productRepository.findAll();
        assertThat(savedProducts).hasSize(count);
    }
}
