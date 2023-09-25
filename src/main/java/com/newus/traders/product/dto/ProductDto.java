/**
 * @author wheesunglee
 * @create date 2023-09-19 08:30:07
 * @modify date 2023-09-20 17:41:18
 */

package com.newus.traders.product.dto;

import java.time.LocalDateTime;

import com.newus.traders.product.entity.Product;
import com.newus.traders.product.type.ProductStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Builder
@AllArgsConstructor
@RequiredArgsConstructor
@Getter
public class ProductDto {

    private int id;

    // 회원 entity와 연결
    // seller;

    private String name;

    private Long price;

    private String description;

    private LocalDateTime postedAt;

    private ProductStatus status;

    // 거래 위치

    public static ProductDto from(Product product) {
        return ProductDto.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .description(product.getDescription())
                .postedAt(product.getPostedAt())
                .status(product.getStatus())
                .build();

    }

}