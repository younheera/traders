/**
 * @author wheesunglee
 * @create date 2023-09-19 08:20:08
 * @modify date 2023-09-19 08:20:08
 */
package com.newus.traders.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.newus.traders.product.entity.Product;


public interface ProductRepository extends JpaRepository<Product, Integer> {
}