/**
 * @author wheesunglee
 * @create date 2023-10-22 12:59:20
 * @modify date 2023-10-22 12:57:23
 */
package com.newus.traders.notification.service;

import com.newus.traders.chat.dto.ChatDto;
import com.newus.traders.notification.entity.Notification;
import com.newus.traders.notification.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import java.time.Duration;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public void saveNotification(ChatDto chatDto) {
        Notification notification = new Notification(chatDto);
        notificationRepository.save(notification);
    }

    public Flux<ServerSentEvent<String>> getNotifications(String username) {
        return Flux.interval(Duration.ofSeconds(1)) // 일정 간격으로 데이터를 전송할 수 있도록 설정
                .flatMap(seq -> {
                    List<Notification> notifications = notificationRepository.findAllByReceiverAndIsDeliveredTrue(username);
                    for (Notification notification : notifications) {
                        notification.setIsDelivered(true);
                        notificationRepository.save(notification);
                    }
                    return Flux.fromIterable(notifications)
                            .map(notification -> ServerSentEvent.builder(
                                            notification.getSender() + "님이 메세지를 보내셨습니다. " +
                                                    notification.getCreatedAt()+
                                                    "\n")
                                    .build());
                });
    }


}

