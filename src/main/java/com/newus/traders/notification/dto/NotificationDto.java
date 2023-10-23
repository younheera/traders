/**
 * @author wheesunglee
 * @create date 2023-10-22 12:58:52
 * @modify date 2023-10-22 12:57:23
 */
package com.newus.traders.notification.dto;

import com.newus.traders.notification.entity.Notification;
import lombok.Builder;

import java.time.LocalDateTime;

public class NotificationDto {

    private String sender;
    private LocalDateTime createdAt;
    private String content;


    @Builder
    public NotificationDto(Notification notification) {
        this.sender = notification.getSender();
        this.createdAt = notification.getCreatedAt();
        this.content = notification.getSender() + "님이 메세지를 보내셨습니다.\n" + notification.getCreatedAt().toLocalDate();


    }

}
