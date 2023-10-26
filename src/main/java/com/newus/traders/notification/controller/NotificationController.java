/**
 * @author wheesunglee
 * @create date 2023-10-22 12:57:22
 * @modify date 2023-10-22 12:57:23
 */
package com.newus.traders.notification.controller;

import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.newus.traders.notification.entity.Notification;
import com.newus.traders.notification.service.NotificationService;
import com.newus.traders.user.jwt.TokenProvider;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;

@RequiredArgsConstructor
@RestController // 데이터 리턴 서버
@RequestMapping("/api")
public class NotificationController {

    private final NotificationService notificationService;
    private final TokenProvider tokenProvider;

    public String getUserDetails(String accessToken) {
        Authentication authentication = tokenProvider.getAuthentication(accessToken);
        Object principal = authentication.getPrincipal();
        UserDetails userDetails = (UserDetails) principal;
        return userDetails.getUsername();
    }

    @GetMapping(value = "/notifications/{user}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Notification> getNotifications(@PathVariable String user) {
        return notificationService.getNotificationsByReceiverAsFlux(user);
    }

}
