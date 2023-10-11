package com.newus.traders.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.newus.traders.model.entity.KakaoUser;

public interface KakaoUserRepository extends JpaRepository<KakaoUser, Long> {
    // JPA findBy 규칙
    // select * from user_master where kakao_email = ?
    public KakaoUser findByKakaoEmail(String kakaoEmail);
    
    public KakaoUser findByUserCode(String userCode);

}
