/**
 * @author wheesunglee
 * @create date 2023-10-22 12:59:20
 * @modify date 2023-10-22 12:57:23
 */
package com.newus.traders.notification.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.newus.traders.chat.dto.ChatDto;
import com.newus.traders.notification.entity.Notification;
import com.newus.traders.notification.repository.NotificationRepository;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public void saveNotification(ChatDto chatDto) {
        Notification notification = new Notification(chatDto);
        notificationRepository.save(notification);
    }

    public Flux<Notification> getNotificationsByReceiverAsFlux(String receiver) {
        // List<Notification> notifications =
        // notificationRepository.findAllByReceiver(receiver);
        List<Notification> notifications = notificationRepository.findAllByReceiverAndIsDeliveredFalse(receiver);
        for (Notification notification : notifications) {
            notification.setIsDelivered(true);
            notificationRepository.save(notification);
        }

        // Flux<Notification> stringFlux = Flux.fromIterable(notifications);
        // stringFlux.count().subscribe(count ->
        // System.out.println(":::::::::::::::Count: " + count));

        return Flux.fromIterable(notifications);
    }

}
