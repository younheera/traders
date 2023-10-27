/**
 * @author wheesunglee
 * @create date 2023-10-22 12:55:02
 * @modify date 2023-10-22 12:57:23
 */
package com.newus.traders.notification.entity;

import com.newus.traders.chat.document.ChatDto;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String sender;
    private String receiver;
    private LocalDateTime createdAt;
    private boolean isDelivered;

    @Builder
    public Notification(ChatDto chatDto) {
        this.sender = chatDto.getSender();
        this.receiver = chatDto.getReceiver();
        this.createdAt = chatDto.getCreatedAt();
        this.isDelivered = false;

    }

    public void setIsDelivered(boolean isDelivered) {
        this.isDelivered = isDelivered;
    }
}
