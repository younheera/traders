/**
 * @author hyunseul
 * @create date 2023-09-26 17:02:51
 * @modify date 2023-09-26 17:02:51
 */
package com.newus.traders.chat.repository;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

import org.springframework.stereotype.Component;
import com.newus.traders.chat.dto.ChatDto;

import reactor.core.publisher.Flux;

// MongoDB에서 방번호로 채팅 메세지 조회

@SpringBootApplication
@Component
public interface ChatRepository extends ReactiveMongoRepository<ChatDto, String> {

    // 1:1 채팅 내용
    // @Tailable // 커서 안닫고 계속 유지(실시간 데이터 업데이트)
    // @Query("{ sender : ?0, receiver :?1}") // 서버가 돌아가면 데이터 찾는 쿼리 실행
    // Flux<ChatDto> mFindBySender(String sender, String receiver); // Flux(흐름)
    //  //response를 유지하면서 데이터 계속 흘려보내기

    // 채팅방 번호로 채팅 내용 뽑기
    // @Tailable
    @Query("{ roomNum: ?0 }")
    Flux<ChatDto> mFindByRoomNum(String roomNum);


    // 채팅방 리스트
    @Query("{ $or: [{ sender : ?0 }, { receiver : ?1 }] }")
    Flux<ChatDto> findBySenderOrReceiver(String sender, String receiver);

    
    
}
