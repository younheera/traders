package com.newus.traders.user.util;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

@Slf4j
public class SecurityUtil { //JwtFilter 에서 SecurityContext 에 세팅한 유저 정보를 꺼내기

   private SecurityUtil() {}

   // SecurityContext 에 유저 정보가 저장되는 시점, SecurityContext 는 ThreadLocal 에 사용자의 정보를 저장
   // Request 가 들어올 때 JwtFilter 의 doFilter 에서 저장
    public static Long getCurrentUserId() {
      final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

      if (authentication == null || authentication.getName() == null) {
          throw  new RuntimeException("Security Context 에 인증 정보가 없습니다.");
      }
      return Long.parseLong(authentication.getName()); //userId를 저장하므로 꺼내서 Long 타입 파싱 반환
  }
}