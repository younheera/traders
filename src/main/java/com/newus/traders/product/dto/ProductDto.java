/**
 * @author wheesunglee
 * @create date 2023-09-19 08:30:07
 * @modify date 2023-10-06 18:52:03
 */

package com.newus.traders.product.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.newus.traders.product.entity.Image;
import com.newus.traders.product.entity.Product;
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

    private List<Image> images;

    private Long likes;

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
        this.images = product.getImages();
        this.likes = product.getLikes();
    }

}