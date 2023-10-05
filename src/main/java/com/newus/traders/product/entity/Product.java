/**
 * @author wheesunglee
 * @create date 2023-09-19 08:21:17
 * @modify date 2023-10-05 10:58:41
 */
package com.newus.traders.product.entity;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.newus.traders.product.dto.ProductDto;
import com.newus.traders.product.type.ProductStatus;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    // 회원 entity와 연결
    // @ManyToOne
    // seller;

    private String name;

    private Long price;

    private String description;

    @Enumerated(EnumType.STRING)
    private ProductStatus status;

    private double latitude;

    private double longitude;

    private String category;

    @CreationTimestamp
    private Timestamp createdAt;

    @UpdateTimestamp
    private Timestamp updatedAt;

    @Builder
    public Product(ProductDto productDto) {
        this.name = productDto.getName();
        this.price = productDto.getPrice();
        this.description = productDto.getDescription();
        this.status = ProductStatus.AVAILABLE;
        this.latitude = productDto.getLatitude();
        this.longitude = productDto.getLongitude();
        this.category = productDto.getCategory();
    }

    public void updateProduct(ProductDto productDto) {
        this.name = productDto.getName();
        this.price = productDto.getPrice();
        this.description = productDto.getDescription();
        this.latitude = productDto.getLatitude();
        this.longitude = productDto.getLongitude();
        this.category = productDto.getCategory();
    }

    public void purchaseProduct() {
        this.status = ProductStatus.SOLD;
    }

}