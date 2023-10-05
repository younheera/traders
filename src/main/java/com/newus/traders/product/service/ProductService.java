/**
 * @author wheesunglee
 * @create date 2023-09-19 08:19:20
 * @modify date 2023-10-05 12:01:24
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
import com.newus.traders.product.form.ProductRegisterForm;
import com.newus.traders.product.repository.ProductRepository;
import com.newus.traders.product.type.ProductStatus;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<ProductDto> getAllProducts() {
        List<Product> productList = productRepository.findAll();

        if (productList.size() == 0) {
            // 리스트가 0일 경우에 --- 메세지를 좀 수정할 필요는 보임!
            throw new CustomException(ErrorCode.PRODUCT_NOT_FOUND);
        }

        List<ProductDto> productDtoList = new ArrayList<>();

        for (Product product : productList) {
            productDtoList.add(new ProductDto(product));
        }

        return productDtoList;
    }

    public ProductDto getProduct(int productId) {
        Optional<Product> optionalProduct = productRepository.findById(productId);

        if (!optionalProduct.isPresent()) {
            throw new CustomException(ErrorCode.PRODUCT_NOT_FOUND);
        }

        Product product = optionalProduct.get();

        return new ProductDto(product);
    }

    public String registerProduct(ProductRegisterForm productRegisterForm) {

        ProductDto productDto = new ProductDto(productRegisterForm);

        Product product = new Product(productDto);

        try {
            productRepository.save(product);

        } catch (RuntimeException exception) {
            throw new CustomException(ErrorCode.PRODUCT_NOT_SAVED);
        }

        return "물품 등록을 완료하였습니다.";
    }

    public String updateProduct(int productId, ProductRegisterForm productRegisterForm) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new CustomException(ErrorCode.PRODUCT_NOT_FOUND));

        if (!product.getStatus().equals(ProductStatus.AVAILABLE)) {
            throw new CustomException(ErrorCode.PRODUCT_NOT_UPDATED);
        }

        ProductDto productDto = new ProductDto(productRegisterForm);

        product.updateProduct(productDto);

        try {
            productRepository.save(product);

        } catch (RuntimeException exception) {
            throw new CustomException(ErrorCode.PRODUCT_NOT_SAVED);
        }

        return "물품 수정을 완료하였습니다.";
    }

    public String deleteProduct(int productId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new CustomException(ErrorCode.PRODUCT_NOT_FOUND));

        try {
            productRepository.delete(product);

        } catch (RuntimeException exception) {
            throw new CustomException(ErrorCode.PRODUCT_NOT_DELETED);
        }

        return "물품 삭제를 완료하였습니다.";
    }

    public String purchaseProduct(int productId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new CustomException(ErrorCode.PRODUCT_NOT_FOUND));

        product.purchaseProduct();

        try {
            productRepository.save(product);

        } catch (Exception exception) {
            throw new CustomException(ErrorCode.PRODUCT_NOT_SAVED);
        }

        return "물품이 판매되었습니다.";
    }

    /**
     * @author jeongyearim
     * @create date 2023-09-26 17:33:07
     * @modify date 2023-09-26 17:33:07
     * @desc [주어진 중심 위도와 경도를 기준으로 3km 반경 내의 상품 리스트를 뽑아옵니다.]
     */

    // 3km 반경의 상품 리스트를 뽑아오기
    public List<ProductDto> getNearestProducts(double latitude, double longitude) {

        // 3km 반경
        double distance = 3.0;

        List<Product> nearestProductList = productRepository.findByDistance(latitude, longitude, distance);

        if (nearestProductList.size() == 0) {
            throw new CustomException(ErrorCode.PRODUCT_NOT_FOUND);
        }

        List<ProductDto> nearestProductDtoList = new ArrayList<>();

        for (Product product : nearestProductList) {
            nearestProductDtoList.add(new ProductDto(product));
        }

        return nearestProductDtoList;
    }

}
