/**
 * @author wheesunglee
 * @create date 2023-10-04 16:10:26
 * @modify date 2023-10-11 15:31:55
 */
package com.newus.traders.redis.service;

import java.time.LocalDate;
import java.util.Iterator;
import java.util.Set;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.newus.traders.exception.CustomException;
import com.newus.traders.exception.ErrorCode;
import com.newus.traders.product.entity.Product;
import com.newus.traders.product.repository.ProductRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RedisService {

    private final RedisTemplate<String, String> redisTemplate;
    private final ProductRepository productRepository;

    public ValueOperations<String, String> operationsForValue() {
        return redisTemplate.opsForValue();
    }

    public void deleteKey(String key) {
        redisTemplate.delete(key);
    }

    public void addLikes(Long productId, Long userId) {

        String productKey = "productId:" + productId;

        if (!getLikes(productId, userId)) {
            System.out.println("addLikes에서 if문: " + userId);
            operationsForValue().setBit(productKey, userId, true);
        }
        System.out.println(userId + " : " + operationsForValue().getBit(productKey, userId));
    }

    public void removeLikes(Long productId, Long userId) {

        String productKey = "productId:" + productId;

        operationsForValue().setBit(productKey, userId, false);
    }

    public boolean getLikes(Long productId, Long userId) {
        String productKey = "productId:" + productId;

        return operationsForValue().getBit(productKey, userId);
    }

    public Long countLikes(Long productId) {

        String productKey = "productId:" + productId;

        return (Long) redisTemplate.execute(connection -> {
            return connection.bitCount(productKey.getBytes());
        }, true);
    }

    public void updateAttendance(LocalDate currentDate, Long userId) {

        String dateKey = currentDate.toString();

        operationsForValue().setBit(dateKey, userId, true);
    }

    public boolean checkAttendance(LocalDate currentDate, Long userId) {
        String dateKey = currentDate.toString();

        return operationsForValue().getBit(dateKey, userId);
    }

    @Scheduled(cron = "0 0 0 * * ?") 
    public void updateLikesInDB() {

        Set<String> productKeySet = redisTemplate.keys("productId*");
        Iterator<String> it = productKeySet.iterator();
        while (it.hasNext()) {

            String productKey = it.next();
            Long productId = Long.parseLong(productKey.split(":")[1]);
            Long likes = countLikes(productId);

            Product product = productRepository.findByIdAndIsDeletedFalse(productId)
            .orElseThrow(() -> new CustomException(ErrorCode.PRODUCT_NOT_FOUND));
            // Product product = productRepository.findByIdAndIsDeletedFalse(productId);

            if (product == null) {
                throw new CustomException(ErrorCode.PRODUCT_NOT_FOUND);
            }

            product.setLikes(likes);

            productRepository.save(product);

        }
        System.out.println("views update complete");

    }

}
