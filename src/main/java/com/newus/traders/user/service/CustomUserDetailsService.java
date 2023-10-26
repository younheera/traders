/**
 * @author heera youn
 * @create date 2023-10-20 15:42:11
 * @modify date 2023-10-24 13:01:25
 */
package com.newus.traders.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.newus.traders.user.entity.User;
import com.newus.traders.user.repository.UserRepository;


import java.util.Collections;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {//UserDetailsService 인터페이스를 구현한 클래스
   private final UserRepository userRepository;

   //시큐리티 내용 외 파라미터 추가하고 싶을 때 사용
   //제약조건: Controller에서 Auth점검 시 UserCustom으로 받기
   
   @Override
   @Transactional
   //loadUserByUsername 메소드를 오버라이드 => 넘겨받은 UserDetails 와 Authentication 의 패스워드를 비교, 검증 로직
   public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        //DB에서 USERNAME을 기반으로 값을 가져옴, 아이디 존재 여부 자동 검증

        User user = userRepository.findByEmail(email).get();

        System.out.println(user.getEmail());

        return userRepository.findByEmail(email)
                .map(this::createUserDetails)
                .orElseThrow(() -> new UsernameNotFoundException(email + " -> 데이터베이스에서 찾을 수 없습니다."));
   }

   // DB 에 User 값이 존재한다면 UserDetails 객체로 만들어서 리턴
   private UserDetails createUserDetails(User user) {
      GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(user.getAuthority().toString());

      return new org.springframework.security.core.userdetails.User(
              //String.valueOf(user.getUserId()),
              user.getUsername(),
              user.getPassword(),
              Collections.singleton(grantedAuthority)
      );
  }

}