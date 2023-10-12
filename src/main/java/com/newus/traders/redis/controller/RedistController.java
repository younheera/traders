/**
 * @author wheesunglee
 * @create date 2023-10-04 16:10:23
 * @modify date 2023-10-04 16:10:23
 */
package com.newus.traders.redis.controller;

import java.time.LocalDate;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.newus.traders.redis.service.RedisService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class RedistController {

    private final RedisService redisService;

    @GetMapping("/redis/attendance")
    public boolean checkAttendance() {

        return redisService.checkAttendance(LocalDate.now(), 3L);
    }

    @PostMapping("/redis/attendance")
    public void updateAttendance() {

        redisService.updateAttendance(LocalDate.now(), 3L);
    }

    @GetMapping("/redis/likes")
    public void getLikes() {

        redisService.deleteKey("productId:" + 1L);
        System.out.println(redisService.getLikes(1L, 3L));
        redisService.addLikes(1L, 3L);
        redisService.addLikes(1L, 3L);
        redisService.addLikes(1L, 2L);
        System.out.println(redisService.getLikes(1L, 3L));
        System.out.println(redisService.getLikes(1L, 2L));
        System.out.println(redisService.countLikes(1L));
        redisService.removeLikes(1L, 2L);

        Long counts = redisService.countLikes(1L);
        System.out.println(counts);
        redisService.updateLikesInDB();
    }

}
