/**
 * @author wheesunglee
 * @create date 2023-09-19 08:19:20
 * @modify date 2023-09-23 18:36:28
 */
package com.newus.traders.product.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

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

    /**
    * @author jeongyearim
    * @create date 2023-09-26 17:33:07
    * @modify date 2023-09-26 17:33:07
    * @desc [주어진 중심 위도와 경도를 기준으로 반경 내에서 무작위로 생성된 상품을 여러 개 생성합니다. (generateRandomProducts,createRandomProduct)]
    */
    public List<Product> generateRandomProducts(double centerLatitude, double centerLongitude, double radiusInKm, int count) {
        List<Product> randomProducts = new ArrayList<>();

        for (int i = 0; i < count; i++) {
            //Product product = createRandomProduct(centerLatitude, centerLongitude, radiusInKm,i);
            //randomProducts.add(product);
        }

        return randomProducts;
    }



    //generateRandomProducts 메서드에서 호출되는 메서드
    private void createRandomProduct(double centerLatitude, double centerLongitude, double radiusInKm,int i) {
        Random random = new Random();

        // 무작위 위도 및 경도 생성
        double latOffset = random.nextDouble() * radiusInKm;
        double lonOffset = random.nextDouble() * radiusInKm;

        // 생성된 위도와 경도를 중심으로 반경 내에 무작위로 상품 위치를 설정
        double latitude = centerLatitude + (latOffset * (random.nextBoolean() ? 1 : -1));
        double longitude = centerLongitude + (lonOffset * (random.nextBoolean() ? 1 : -1));

        // 상품 생성 및 반환
        Product product = new Product();
        product.setName("Random Product " + (i + 1)); // 여기서 i는 현재 반복 인덱스입니다.
        product.setLatitude(latitude);
        product.setLongitude(longitude);

        // 기타 상품 속성 설정

                
        
productRepository.save(product);
   
    }
}
