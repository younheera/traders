/**
 * @author wheesunglee
 * @create date 2023-10-06 18:48:12
 * @modify date 2023-10-06 18:48:12
 */
package com.newus.traders.image.repository;

import com.newus.traders.image.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Integer> {

}
