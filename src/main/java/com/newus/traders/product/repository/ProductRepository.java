/**
 * @author wheesunglee
 * @create date 2023-09-19 08:20:08
 * @modify date 2023-09-19 08:20:08
 */
package com.newus.traders.product.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.newus.traders.product.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    @Query(value = "SELECT DISTINCT p.* FROM product p WHERE (6371 * acos(cos(:latitude * (3.141592653589793 / 180)) * cos(p.latitude * (3.141592653589793 / 180)) * cos((:longitude * (3.141592653589793 / 180)) - (p.longitude * (3.141592653589793 / 180))) + sin(:latitude * (3.141592653589793 / 180)) * sin(p.latitude * (3.141592653589793 / 180)))) <= :distance", nativeQuery = true)
    List<Product> findByDistance(@Param("latitude") double latitude, @Param("longitude") double longitude,
            @Param("distance") double distance);

            
}