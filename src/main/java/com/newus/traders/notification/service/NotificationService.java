/**
 * @author wheesunglee
 * @create date 2023-10-22 12:59:20
 * @modify date 2023-10-22 12:57:23
 */
package com.newus.traders.notification.service;

import com.newus.traders.chat.document.ChatDto;
import com.newus.traders.notification.entity.Notification;
import com.newus.traders.notification.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public void saveNotification(ChatDto chatDto) {
        Notification notification = new Notification(chatDto);
        notificationRepository.save(notification);
    }

    public Flux<Notification> getNotificationsByReceiverAsFlux(String receiver) {

        List<Notification> notifications = notificationRepository.findAllByReceiverAndIsDeliveredFalse(receiver);
        for (Notification notification : notifications) {
            System.out.println("::::::전:"+notification.isDelivered());
            notification.setIsDelivered(true);
            notificationRepository.save(notification);
            System.out.println("::::::후:"+notification.isDelivered());
        }

        return Flux.fromIterable(notifications);
    }

}
