/**
 * @author wheesunglee
 * @create date 2023-10-06 18:48:12
 * @modify date 2023-10-06 18:48:12
 */
package com.newus.traders.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.newus.traders.product.entity.Image;

public interface ImageRepository extends JpaRepository<Image, Integer> {

}
