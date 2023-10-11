/**
 * @author hyunseul
 * @create date 2023-09-26 17:02:45
 * @modify date 2023-09-26 17:02:45
 */
package com.newus.traders.chat.dto;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Document(collection = "chat")
@AllArgsConstructor
@NoArgsConstructor
public class ChatDto {

    @Id
    private String id;
    private String msg;
    private String sender; // 보내는 사람
    private String receiver; // 받는사람
    private Integer roomNum; // 방번호

    private LocalDateTime createdAt;

}
