/**
 * @author wheesunglee
 * @create date 2023-09-19 08:30:07
 * @modify date 2023-10-05 12:01:21
 */

package com.newus.traders.product.dto;

import java.time.LocalDateTime;

import com.newus.traders.product.entity.Product;
import com.newus.traders.product.form.ProductRegisterForm;
import com.newus.traders.product.type.ProductStatus;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProductDto {

    private int id;

    // 회원 entity와 연결
    // seller;

    private String name;

    private Long price;

    private String description;

    private ProductStatus status;

    private double latitude;

    private double longitude;

    private String category;

    private LocalDateTime createdAt;

    @Builder
    public ProductDto(Product product) {
        this.id = product.getId();
        this.name = product.getName();
        this.price = product.getPrice();
        this.description = product.getDescription();
        this.status = product.getStatus();
        this.latitude = product.getLatitude();
        this.longitude = product.getLongitude();
        this.category = product.getCategory();
    }

    public ProductDto(ProductRegisterForm productRegisterForm) {
        this.name = productRegisterForm.getName();
        // this.price = Long.parseLong(productRegisterForm.getPrice());
        this.price = productRegisterForm.getPrice();
        this.description = productRegisterForm.getDescription();
        this.latitude = productRegisterForm.getLatitude();
        this.longitude = productRegisterForm.getLongitude();
        this.category = productRegisterForm.getCategory();
    }
}