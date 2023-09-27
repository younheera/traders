/**
 * @author wheesunglee
 * @create date 2023-09-19 08:21:17
 * @modify date 2023-09-20 17:41:36
 */
package com.newus.traders.product.entity;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.newus.traders.product.type.ProductStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
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

    private LocalDateTime postedAt;

    // 상품 판매 가능 상태
    private ProductStatus status;

    private double latitude;

    private double longitude;

    private String category;

}