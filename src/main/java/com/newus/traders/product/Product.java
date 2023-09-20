/**
 * @author wheesunglee
 * @create date 2023-09-19 08:21:17
 * @modify date 2023-09-19 08:21:17
 */
package com.newus.traders.product;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    // 회원 entity와 연결
    // @ManyToOne
    // seller;

    private String name;

    private String price;

    private String description;

    private LocalDateTime postedAt;

    // 상품 판매 가능 상태
    private ProductStatus status;

    // 거래 위치

}
