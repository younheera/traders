/**
 * @author wheesunglee
 * @create date 2023-10-22 12:57:22
 * @modify date 2023-10-22 12:57:23
 */
package com.newus.traders.notification.controller;

import com.newus.traders.notification.service.NotificationService;
import com.newus.traders.user.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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


    @GetMapping(value = "/notification")
//    public SseEmitter getAllNotifications(@RequestHeader("token") String accessToken) {
    public Flux<ServerSentEvent<String>> getAllNotifications() {
        System.out.println("::::::::::::::::::::::::::::::::: getAllNotifications ::::::::::::::::::::::::::::: yeji");
//        return notificationService.getNotifications(getUserDetails(accessToken));
        return notificationService.getNotifications("inna");
    }


}
