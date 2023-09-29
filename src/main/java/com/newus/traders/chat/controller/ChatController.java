
/**
 * @author hyunseul
 * @create date 2023-09-26 17:02:48
 * @modify date 2023-09-26 17:02:48
 */
package com.newus.traders.chat.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.newus.traders.chat.dto.ChatDto;
import com.newus.traders.chat.service.ChatService;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

// 채팅 메세지 생성, 조회 및 스트리밍
@RequiredArgsConstructor
@RestController // 데이터 리턴 서버
@RequestMapping("/api")
public class ChatController {

    private final ChatService chatService; // 채팅 메세지 저장, 검색

    @GetMapping(value = "/chat/roomNum/{roomNum}", produces = MediaType.TEXT_EVENT_STREAM_VALUE) // 채팅방 번호와 관련된 채팅 메세지
                                                                                                 // 조회
    public Flux<ChatDto> findByRoomNum(@PathVariable Integer roomNum) {

        return chatService.getChatMessageByRoomNum(roomNum);
    }

    @PostMapping("/chat")
    public Mono<ChatDto> setMsg(@RequestBody ChatDto chat) { // 클라이언트로부터 json형식의 데이터를 받아서 채팅 메세지 생성후 데이터 베이스에 저장
        System.out.println(chat);
        return chatService.setMsg(chat);
    }

    @GetMapping("/chat/list") // 채팅방 목록조회
    public Flux<ChatDto> getChatMessageByRoomNum(@RequestParam Integer roomNum) {
        return chatService.getChatMessageByRoomNum(roomNum);
    }
}
